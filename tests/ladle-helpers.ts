import fetch from "sync-fetch";

export interface LadleMeta {
  about: {
    homepage: string;
    version: number;
  };
  stories: {
    key: string;
    name: string;
    filepath: string;
    meta: {
      testWithSnapshot: boolean;
      iframed: boolean;
    };
  }[];
}

// URL where Ladle is served
export const URL = "http://localhost:61000";

export const fetchLadleMeta = (url: string): LadleMeta => {
  const ladleMeta = fetch(`${url}/meta.json`).json();

  const stories = Object.keys(ladleMeta.stories).map((key) => {
    const story = ladleMeta.stories[key];
    return {
      key: key,
      name: story.name,
      filepath: story.filepath,
      meta: {
        testWithSnapshot: story.meta.testWithSnapshot === true,
        iframed: story.meta.iframed === true,
      },
    }
  });

  return {
    about: {
      homepage: ladleMeta.about.homepage,
      version: ladleMeta.about.version,
    },
    stories: stories,
  };
};

