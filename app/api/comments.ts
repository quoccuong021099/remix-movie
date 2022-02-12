export type CommentEntry = {
  id: string;
  filmId: string;
  cateId: string;
  name: string;
  comment: string;
};

export const getComments = async (
  name?: string | null,
  newCate?: string | 0
) => {
  const response = await fetch(
    `http://localhost:9001/comments?filmId=${name}&cateId=${newCate}`
  );
  return response.json();
};

export const addComment = async (comment: CommentEntry) => {
  const response = await fetch('http://localhost:9001/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
