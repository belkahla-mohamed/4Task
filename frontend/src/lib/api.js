// Achievements API helpers for Strapi

const STRAPI_URL = "https://necessary-laughter-8861a20860.strapiapp.com";

export async function fetchAchievements() {
  const res = await fetch(`${STRAPI_URL}/api/achievements?populate=icon`);
  const data = await res.json();
  return (data.data || []).map(item => ({
    id: item.id,
    documentId: item.documentId || item.id,
    title: item?.title || item.title || "Untitled Achievement",
    description: item?.description || item.description || "",
    xp: item?.xp || 0,
    iconUrl: item?.icon?.data?.url || null,
    requirement: item?.requirement || null,
  }));
}

export async function fetchUserTasks(userId) {
  // Assumes tasks have a user relation
  const res = await fetch(`${STRAPI_URL}/api/tasks?filters[user][id][$eq]=${userId}`);
  const data = await res.json();
  return (data.data || []).map(item => ({
    id: item.id,
    documentId: item.documentId || item.id,
    status: item?.statusTask || item.statusTask || "pending",
    ...item.attributes
  }));
}

export async function fetchClaimedAchievements(userId) {
  // Assumes user-achievement has user and achievement relations
  const res = await fetch(`${STRAPI_URL}/api/user-achievements?filters[user][id][$eq]=${userId}&populate=achievement`);
  const data = await res.json();
  return (data.data || []).map(item => item?.achievement?.data?.id || null).filter(Boolean);
}

export async function claimAchievement(userId, achievementId) {
  const res = await fetch(`${STRAPI_URL}/api/user-achievements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        user: userId,
        achievement: achievementId,
        claimedAt: new Date().toISOString(),
      },
    }),
  });
  return await res.json();
}

export async function fetchUserProgress(userId) {
  const res = await fetch(`${STRAPI_URL}/api/user-progresses?filters[user][id][$eq]=${userId}`);
  const data = await res.json();
  if (data.data && data.data.length > 0) {
    const item = data.data[0];
    return {
      id: item.id,
      xp: item.attributes?.xp || 0,
      level: item.attributes?.level || 1,
      streak: item.attributes?.streak || 0,
      user: item.attributes?.user?.data?.id || null,
    };
  }
  return { xp: 0, level: 1, streak: 0, user: userId };
} 