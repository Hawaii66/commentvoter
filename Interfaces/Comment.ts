export interface YouTubeComment {
  author: string;
  comment: string;
  id: string;
}

export interface VoteOptions {
  options: string[];
}

export interface VoteResults {
  options: {
    option: string;
    votes: number;
  }[];
}
