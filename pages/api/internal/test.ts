import { NextApiRequest, NextApiResponse } from "next";
import { GetComments } from "../../../Functions/GetYoutubeComments";
import { YouTubeComment } from "../../../Interfaces/Comment";

interface Data {
  comments: YouTubeComment[];
  length: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const params = req.query;
  const youtubeVideoId = params.videoId?.toString() || "";
  if (youtubeVideoId === "") {
    res.status(400).send("Wrong format for YouTube Video ID string");
    return;
  }

  const comments = await GetComments(youtubeVideoId);

  res.send({
    length: comments.length,
    comments: comments,
  });
}
