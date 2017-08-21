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
    [Route("/Yoga/Sayg1/Comfirm", "Post")] //
    [Route("/Yoga/Sayg1/Check", "Get")]   // PhoneNumber= ? Or UserName = ?, PassWord= ?
    public class Sayg : IReturn<CommonResponse> 
    {
        public string PhoneNumber { get; set; }
        public string PassWord { get; set; }
        public string UpdateAllString { get; set; }

    }
    public class Sayg__Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Sayg1> LoginCheck(Sayg request)
        {

            List<Sayg1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("Yoga"))
                {
                    string strSql = "";

                    if (request.PhoneNumber != null && request.PhoneNumber.Length > 0 && request.PassWord != null && request.PassWord.Length > 0)
                    {
                        strSql = "Select isnull(PhoneNumber,'') as  PhoneNumber ,isnull(PassWord,'') as  PassWord From Sayg1 Where PhoneNumber='" + request.PhoneNumber + "' And PassWord ='" + request.PassWord + "' ";
                        Result = db.Select<Sayg1>(strSql);
                    }

                }
            }
            catch { throw; }
            return Result;

        }
        public int Comfirm_Sayg1(Sayg request)
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
                                string YogaStudioNo = ja[i]["YogaStudioName"].ToString();
                                string YogaStudioName = ja[i]["YogaStudioName"].ToString();
                                string Name =  ja[i]["Name"].ToString();
                                string AreaCode = ja[i]["AreaCode"].ToString();
                                string Address = ja[i]["Address"].ToString();
                                string Sex = ja[i]["Sex"].ToString();
                                string Remark = ja[i]["Remark"].ToString();
                                string PhoneNumber = ja[i]["PhoneNumber"].ToString();                            
                                string PassWord = ja[i]["PassWord"].ToString();

                                strSql = "insert into sayg1( " +
                           "   YogaStudioNo," +
                           "   YogaStudioName," +
                           "   Name ," +
                           "   AreaCode," +
                           "   Address ," +
                           "   Sex," +
                           "   Remark ," +
                           "   PhoneNumber ," +
                           "   PassWord ," +        
                           "   CreateDateTime," +
                           "   UpdateDateTime" +               
                           "  )" +
                               "values( " +
                               Modfunction.SQLSafeValue(YogaStudioNo) + " , " +
                               Modfunction.SQLSafeValue(YogaStudioName) + "," +
                               Modfunction.SQLSafeValue(Name) + "," +
                               Modfunction.SQLSafeValue(AreaCode) + "," +                         
                               Modfunction.SQLSafeValue(Address) + "," +
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
