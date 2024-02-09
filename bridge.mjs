import micri from "micri";
import queryString from "query-string";

const MATTERMOST_WEBHOOK_URL = process.env.MATTERMOST_WEBHOOK_URL;

const { json } = micri;

const forwardSentryEvent = (payload, channel) => {
  console.log("forwardSentryEvent", channel);
  console.log(JSON.stringify(payload));
  const event = payload.data ? payload.data.event : payload.event;
  const markdown = `
:warning: ${
    event.extra && event.extra.namespace ? `**${event.extra.namespace}**` : ``
  } **${payload.message || event.title}** ${
    event.environment ? `[${event.environment}]` : ``
  }

${payload.culprit || ""}

${
  (event.contexts &&
    event.contexts.browser &&
    `browser : ${event.contexts.browser.name}/${
      event.contexts.os
        ? event.contexts.os.name
        : event.contexts.client_os
        ? event.contexts.client_os.name
        : event.contexts.device.model
    }`) ||
  ""
}

${event.request ? `url : ${event.request.url}` : ""}

[See details in sentry](${event.web_url || payload.url})
`;

  const response = {
    response_type: "in_channel",
    channel: channel || "sentry",
    username: "Sentry",
    // icon_url:
    //  "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/198/freezing-face_1f976.png",
    text: markdown,
  };

  return fetch(MATTERMOST_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.text());
};

export const bridge = async (req) => {
  if (req.method === "POST") {
    const parsed = queryString.parse(req.url.substring(req.url.indexOf("?")));
    const channel = parsed.channel || "?";
    console.log(`Trigger on channel:${channel}`);
    try {
      const payload = await json(req);
      await forwardSentryEvent(payload, channel);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  return "ok";
};
