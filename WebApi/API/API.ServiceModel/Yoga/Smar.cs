using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using ServiceStack.ServiceHost;

namespace WebApi.ServiceModel.Yoga
{
    [Route("/Yoga/Smar1/Comfirm", "Post")] //
     [Route("/Yoga/Smar1/Check", "Get")]   // PhoneNumber= ? Or UserName = ?, PassWord= ?
    public class Smar : IReturn<CommonResponse>
    {
        public string PhoneNumber { get; set; }
        public string PassWord { get; set; }
        public string UpdateAllString { get; set; }
     

    }
    public class Smar__Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Samr1> LoginCheck(Smar request)
        {

            List<Samr1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("Yoga"))
                {
                    string strSql = "";
                
                    if (request.PhoneNumber != null && request.PhoneNumber.Length > 0 && request.PassWord != null && request.PassWord.Length > 0)
                    {
                        strSql = "Select isnull(PhoneNumber,'') as  PhoneNumber ,isnull(PassWord,'') as  PassWord From Samr1 Where PhoneNumber='" + request.PhoneNumber + "' And PassWord ='" + request.PassWord + "' ";
                        Result = db.Select<Samr1>(strSql);
                    }

                }
            }
            catch { throw; }
            return Result;

        }
        public int Comfirm_Smar1(Smar request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection())
                {
                    if (request.UpdateAllString != null && request.UpdateAllString != "")
                    {
                        JArray ja = (JArray)JsonConvert.DeserializeObject(request.UpdateAllString);
                        if (ja != null)
                        {
                            for (int i = 0; i < ja.Count(); i++)
                            {
                                string strSql = "";
                                string PhoneNumber = ja[i]["PhoneNumber"].ToString();                        
                               string PassWord = ja[i]["PassWord"].ToString();                           
                                string YogaStudioName = ja[i]["YogaStudioName"].ToString();
                                string Sex = ja[i]["Sex"].ToString();
                                string Remark = ja[i]["Remark"].ToString();
                                string AreaCode = ja[i]["AreaCode"].ToString();

                                strSql = "insert into Samr1( " +              
                 "   YogaStudioName," +      
                 "   AreaCode," +           
                 "   Sex," +
                 "   Remark ," +
                 "   PhoneNumber ," +
                 "   PassWord ," +
                 "   CreateDateTime," +
                 "   UpdateDateTime" +
                 "  )" +
                     "values( " +      
                     Modfunction.SQLSafeValue(YogaStudioName) + "," +
                     Modfunction.SQLSafeValue(AreaCode) + "," +
                     Modfunction.SQLSafeValue(Sex) + "," +
                     Modfunction.SQLSafeValue(Remark) + "," +
                     Modfunction.SQLSafeValue(PhoneNumber) + "," +
                     Modfunction.SQLSafeValue(PassWord) + "," +
                     "GETDATE()," +
                     "GETDATE()" +
                     ") ";
                                db.ExecuteSql(strSql);






                            }
                            Result = 1;
                        }
                    }
                }
            }
            catch { throw; }
            return Result;
        }

    }
}
