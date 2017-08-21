using ServiceStack.ServiceHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
namespace WebApi.ServiceModel.Yoga
{
    [Route("/Yoga/subs1", "Get")]  //PublishDate=   

    public class Subs : IReturn<CommonResponse>
    {
        public DateTime PublishDate { get; set; }
   
   

    }
    public class Subs_Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public List<Subs1> Get_tjms2_List(Subs request)
        {

            List<Subs1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("Yoga"))
                {
                    string strSql = "";
                    strSql = " select isnull((select tjms1.JobNo from tjms1 where trxno = tjms2.TrxNo),'') as JobNo ," +
                                " tjms2.TrxNo, " +
                                " tjms2.LineItemNo," +
                                " TJMS2.Pcs," +
                                " TJMS2.GrossWeight," +
                                " isnull(TJMS2.CargoDescription1, '') as CargoDescription1," +
                                " isnull(TJMS2.CargoDescription2, '') as CargoDescription2," +
                                " isnull(TJMS2.CargoDescription3, '') as CargoDescription3," +
                                 " isnull(TJMS2.OfficeInChargeName, '') as OfficeInChargeName," +
                                " isnull((select tjms3.BargeName from tjms3 where trxno = tjms2.TrxNo and LineItemNo = 1) ,'') as BargeName1 ," +
                                " isnull((select tjms3.BargeName from tjms3 where trxno = tjms2.TrxNo and LineItemNo = 2) ,'') as BargeName2 ," +
                                " isnull((select tjms3.BargeName from tjms3 where trxno = tjms2.TrxNo and LineItemNo = 3) ,'') as BargeName3 ," +
                                " (select tjms1.DateCompleted from tjms1 where trxno = tjms2.TrxNo) as DateCompleted," +
                                " isnull(TJMS2.ContainerNo1, '') as ContainerNo1," +
                                " isnull(TJMS2.ContainerType1, '') as ContainerType1," +
                                " tjms2.Pcs1 as Pcs1," +
                                " isnull(TJMS2.CargoDescription1, '') as CargoDescription1, " +
                                " isnull(TJMS2.VehicleNo1, '') as VehicleNo1," +
                                " (select tjms4.StartDateTime from tjms4 where tjms4.trxno = tjms2.TrxNo and tjms4.LineItemNo = tjms2.lineItemNo) as StartDateTime," +
                                " (select tjms4.EndDateTime from tjms4 where tjms4.trxno = tjms2.TrxNo and tjms4.LineItemNo = tjms2.lineItemNo) as EndDateTime," +
                                " isnull(TJMS2.ContainerNo2, '') as ContainerNo2," +
                                " isnull(TJMS2.ContainerType2, '') as ContainerType2," +
                                " tjms2.Pcs2 as Pcs2," +
                                " isnull(TJMS2.CargoDescription2, '') as CargoDescription2," +
                                " isnull(TJMS2.VehicleNo2, '') as VehicleNo2," +
                                " isnull(TJMS2.ContainerNo3, '') as ContainerNo3," +
                                " isnull(TJMS2.ContainerType3, '') as ContainerType3," +
                                " tjms2.Pcs3 as Pcs3," +
                                " isnull(TJMS2.CargoDescription3, '') as CargoDescription3," +
                                " isnull(TJMS2.VehicleNo3, '') as VehicleNo3," +
                                " (select tjms1.ChargeBerthQty from tjms1 where trxno = tjms2.TrxNo) as ChargeBerthQty," +
                                " (select tjms1.ChargeLiftingQty from tjms1 where trxno = tjms2.TrxNo) as ChargeLiftingQty," +
                                " isnull((select tjms1.ChargeOther from tjms1 where trxno = tjms2.TrxNo),'') as ChargeOther," +
                                " isnull((select tjms1.SignedByName from tjms1 where trxno = tjms2.TrxNo),'') as SignedByName," +
                                " isnull((select tjms1.SignedByNric from tjms1 where trxno = tjms2.TrxNo),'') as SignedByNric," +
                                " isnull((select tjms1.SignedByDesignation from tjms1 where trxno = tjms2.TrxNo),'') as SignedByDesignation," +
                                " isnull((select CompanyName from saco1),'') as CompanyName" +
                                "  from tjms2  where trxno = ";
                    Result = db.Select<Subs1>(strSql);
                }
            }
            catch { throw; }
            return Result;

        }
    }
}
