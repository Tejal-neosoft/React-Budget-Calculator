import React from "react";
import SocialLogin from "react-social-login";


class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <button  className="btn btn-danger text-white mt-4" onClick={triggerLogin} {...props}>
        {children}
      </button>
    );
  }
}

export default SocialLogin(SocialButton);