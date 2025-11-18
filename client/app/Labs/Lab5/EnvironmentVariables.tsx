const HTTP_SERVER = "https://kambaz-node-server-app-ttnj.onrender.com";
const PROXY_SERVER = "/api/proxy";

export default function EnvironmentVariables() {
  return (
    <div id="wd-environment-variables">
      <h3>Environment Variables</h3>
      <p>Remote Server: {HTTP_SERVER}</p>
      <p>Using Proxy: {PROXY_SERVER}</p>
      <hr />
    </div>
  );
}
