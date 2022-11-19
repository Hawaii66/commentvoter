import { YouTubeComment } from "../Interfaces/Comment";

export const GetComments = async (youtubeId: string, maxComments?: number) => {
  const key = process.env.YOUTUBE_SECRET;
  const textFormat = "plainText";
  const part = "snippet";
  const maxResults = 100;
  var pageToken = "";
  var finalComments: YouTubeComment[] = [];

  while (pageToken !== undefined) {
    const query = `https://www.googleapis.com/youtube/v3/commentThreads?key=${key}&textFormat=${textFormat}&part=${part}&videoId=${youtubeId}&maxResults=${maxResults}&pageToken=${pageToken}`;
    const result = await fetch(query);
    const data = await result.json();

    const comments = data.items;
    comments.forEach((comment: any) => {
      finalComments.push({
        id: comment.id,
        author: comment.snippet.topLevelComment.snippet.authorDisplayName,
        comment: comment.snippet.topLevelComment.snippet.textDisplay,
      });
    });

    pageToken = data.nextPageToken;

    if (maxComments !== undefined && finalComments.length >= maxComments) {
      break;
    }
  }

  return finalComments;
};
