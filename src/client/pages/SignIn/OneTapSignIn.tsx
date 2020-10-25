import React from "react";

const CLIENT_ID = process.env.RAZZLE_CLIENT_ID;

const LoginOneTap = () => {
  return (
    <div
      id="g_id_onload"
      data-client_id={CLIENT_ID}
      data-auto_select="true"
      data-login_uri="/onetaptokensignin"
      data-cancel_on_tap_outside={false}
      data-prompt_parent_id="g_id_onload"
    />
  );
};

export default LoginOneTap;
