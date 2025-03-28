import { db } from "@/firebase/admin";

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  try {
    const interviews = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    if (interviews.empty) {
      return null;
    }
    return interviews.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Interview[];
  } catch (error: any) {
    console.error("Error fetching interviews by userid", error);
    return null;
  }
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;
  try {
    const interviews = await db
      .collection("interviews")
      .orderBy("createdAt", "desc")
      .where("finalized", "==", true)
      .where("userId", "!=", userId)
      .limit(limit)
      .get();
    if (interviews.empty) {
      return null;
    }
    return interviews.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Interview[];
  } catch (error: any) {
    console.error("Error fetching latest interviews", error);
    return null;
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const interview = await db.collection("interviews").doc(id).get();
    if (!interview) {
      return null;
    }
    return interview.data() as Interview | null;
  } catch (error: any) {
    console.error("Unable to fetch interview by Id", error);
    return null;
  }
}
