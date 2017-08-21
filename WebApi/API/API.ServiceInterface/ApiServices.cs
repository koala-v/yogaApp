using System;
using System.IO;
using System.Web;
using System.Net;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using WebApi.ServiceModel;
using WebApi.ServiceModel.Yoga;
using WebApi.ServiceModel.Utils;
using WebApi.ServiceInterface.Yoga;
using File = System.IO.File;
using System.Reflection;

namespace WebApi.ServiceInterface
{
    public class ApiServices : Service
    {        
        public Auth auth { get; set; }
								#region Yoga
								public ServiceModel.Yoga.Yoga_Login_Logic Dms_Login_Logic { get; set; }
								public object Any(ServiceModel.Yoga.Yoga_Login request)
								{
												CommonResponse ecr = new CommonResponse();
												ecr.initial();
												try
												{
																ServiceInterface.Yoga.LoginService ls = new ServiceInterface.Yoga.LoginService();
																ls.initial(auth, request, Dms_Login_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
												}
												catch (Exception ex) { cr(ecr, ex); }
												return ecr;
								}

        public ServiceModel.Yoga.Smar__Logic Yoga_smar_Logic { get; set; }
        public object Any(ServiceModel.Yoga.Smar request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.TS_Samr(auth, request, Yoga_smar_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }
        public ServiceModel.Yoga.Sayg__Logic Yoga_sayg_Logic { get; set; }
        public object Any(ServiceModel.Yoga.Sayg request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.TS_Sayg(auth, request, Yoga_sayg_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        public ServiceModel.Yoga.Rcbp_Logic Yoga_rcbp_Logic { get; set; }
        public object Any(ServiceModel.Yoga.Rcbp request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.TS_Rcbp(auth, request, Yoga_rcbp_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        public ServiceModel.Yoga.Tobk_Logic Yoga_tobk_Logic { get; set; }
        public object Any(ServiceModel.Yoga.Tobk request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.TS_tjms2(auth, request, Yoga_tobk_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        public ServiceModel.Yoga.tjms_logic Yoga_tjms_Logic { get; set; }
        public object Any(ServiceModel.Yoga.tjms request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.TS_tjms(auth, request, Yoga_tjms_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        public ServiceModel.Yoga.UploadImg_Logic uploadImg_Logic { get; set; }
        public object Any(ServiceModel.Yoga.UploadImg request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.UploadImgService ps = new ServiceInterface.Yoga.UploadImgService();
                if (this.Request.Files.Length > 0)
                {
                    request.RequestStream = this.Request.Files[0].InputStream;
                    request.FileName = this.Request.Files[0].FileName;
                }
                ps.PS_Upload(auth, request, uploadImg_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        public ServiceModel.Yoga.DownLoadImg_Logic DownLoadImg_Logic { get; set; }
        public object Any(ServiceModel.Yoga.DownLoadImg request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.Yoga.TableService ts = new ServiceInterface.Yoga.TableService();
                ts.DownLoadImg(auth, request, DownLoadImg_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }
        #endregion

        #region Common
        public object Post(Uploading request)
								{
												//string[] segments = base.Request.QueryString.GetValues(0);
												//string strFileName = segments[0];
												//string strPath = HttpContext.Current.Request.PhysicalApplicationPath;
												//string resultFile = Path.Combine(@"C:\inetpub\wwwroot\WebAPI\attach", strFileName);
												//if (File.Exists(resultFile))
												//{
												//				File.Delete(resultFile);
												//}
												//using (FileStream file = File.Create(resultFile))
												//{
												//				byte[] buffer = new byte[request.RequestStream.Length];
												//				request.RequestStream.Read(buffer, 0, buffer.Length);
												//				file.Write(buffer, 0, buffer.Length);
												//				file.Flush();
												//				file.Close();
												//}
												return new HttpResult(System.Net.HttpStatusCode.OK);
								}
								#endregion
								private CommonResponse cr(CommonResponse ecr, Exception ex)
        {
            ecr.meta.code = 599;
            ecr.meta.message = "The server handle exceptions, the operation fails.";
            ecr.meta.errors.code = ex.GetHashCode();
            ecr.meta.errors.field = ex.HelpLink;
            ecr.meta.errors.message = ex.Message.ToString();
            return ecr;
        }
    }
}
