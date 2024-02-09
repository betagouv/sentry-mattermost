import micri from "micri";
import { bridge } from "./bridge.mjs";

const PORT = process.env.PORT || 3000;

const { serve } = micri;

const server = serve(bridge);

server.listen(PORT, () => {
  console.log(`sentry-mattermost server started on port ${PORT}`);
});
