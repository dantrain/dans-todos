import React from "react";

const Login = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        id="g_id_onload"
        data-client_id="368363262826-i6ngmdb856kpnjnj3huu2bpnaoiisf3h.apps.googleusercontent.com"
        data-auto_select="true"
        data-login_uri="http://localhost:3000/onetaptokensignin"
        data-cancel_on_tap_outside={false}
        data-prompt_parent_id="g_id_onload"
      />
    </div>
  );
};

export default Login;
