using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.ServiceModel;
using WebApi.ServiceModel.Yoga;

namespace WebApi.ServiceInterface.Yoga
{
    class LoginService
    {
        public void initial(Auth auth, Yoga_Login request, Yoga_Login_Logic loginLogic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/login/check") > 0)
                {
                    
                    ecr.meta.code = 200;
                    ecr.meta.message = "OK";
                    ecr.data.results = loginLogic.LoginCheck(request);
                }
                else
                {
                    ecr.meta.code = 612;
                    ecr.meta.message = "Invalid Login ID";
                }
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }

        }
    }
}
