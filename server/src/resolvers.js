import { faker } from '@faker-js/faker';

/**
 * Format seconds to human readable text in a compact form:
 * s, m or H:m (not m:s or H:m:s)
 */
const humanReadableTimeFromSeconds = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const totalMinutes = Math.floor(seconds / 60);
  let hours = Math.floor(totalMinutes / 60) || 0;
  const minutestoDisplay = totalMinutes % 60;
  let timeStr = ``;
  if (hours > 0) {
    timeStr += `${hours}h `;
  }
  timeStr += `${minutestoDisplay}m`;

  return timeStr;
};


const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getTrack(id);
    },

    // get a single module by ID, for the module detail page
    module: (_, { id }, { dataSources }) => {
      return dataSources.trackAPI.getModule(id);
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },

    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },

    duration: ({ length }) => humanReadableTimeFromSeconds(length),

    reviewScore: () => faker.number.float({min: 1, max: 10, precision: 0.1})
  },
  Module: {
    duration: ({ length }) => humanReadableTimeFromSeconds(length)
  }
};

export default resolvers;
