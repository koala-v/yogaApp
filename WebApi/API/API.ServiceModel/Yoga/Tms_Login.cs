using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;

namespace WebApi.ServiceModel.Yoga
{
    [Route("/Yoga/login/check", "Get")]
    public class Yoga_Login : IReturn<CommonResponse>
    {

        public string UserId { get; set; }
        public string Password { get; set; }

    }
    public class Yoga_Login_Logic
    {


        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public int LoginCheck(Yoga_Login request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("Yoga"))
                {
                    Result = db.Scalar<int>(
                        "Select count(*) From Saus1 Where UserId={0} And Password={1}",
                        request.UserId, request.Password
                    );
                }
            }
            catch { throw; }
            return Result;
        }
 
    }
}
