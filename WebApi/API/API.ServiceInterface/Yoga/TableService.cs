using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.ServiceModel;
using WebApi.ServiceModel.Yoga;

namespace WebApi.ServiceInterface.Yoga
{
    public class TableService
    {

        public void TS_Samr(Auth auth, Smar request, Smar__Logic smar_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/Smar1/Comfirm") > 0)
                {
                    ecr.data.results = smar_logic.Comfirm_Smar1(request);
                }
                else if (uri.IndexOf("/Yoga/Smar1/Check") > 0)
                {
                    ecr.data.results = smar_logic.LoginCheck(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_Sayg(Auth auth, Sayg request, Sayg__Logic sayg_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/Sayg1/Comfirm") > 0)
                {
                    ecr.data.results = sayg_logic.Comfirm_Sayg1(request);
                }
                else if (uri.IndexOf("/Yoga/Sayg1/Check") > 0)
                {
                    ecr.data.results = sayg_logic.LoginCheck(request);
                }
                else if (uri.IndexOf("/Yoga/Sayg1/AreaCode") > 0)
                {
                    ecr.data.results = sayg_logic.Get_areaCodeFiled_List(request);
                }
                else if (uri.IndexOf("Yoga/Sayg1/YogaStudioName") > 0)
                {
                    ecr.data.results = sayg_logic.Get_YogaStudioNameFiled_List(request);
                }
                


                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_tjms2(Auth auth, Tobk request, Tobk_Logic Tobk_Logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {

                if (uri.IndexOf("/Yoga/tjms2/confirm") > 0)
                {
                    ecr.data.results = Tobk_Logic.confirm_tjms2(request);
                }
                else if (uri.IndexOf("/Yoga/tjms2/update") > 0)
                {
                    ecr.data.results = Tobk_Logic.UpdateAll_tjms2(request);
                }
                else if (uri.IndexOf("/Yoga/tjms2/PickupTimeUpdate") > 0)
                {
                    ecr.data.results = Tobk_Logic.updatePickupTime(request);
                }
                else if (uri.IndexOf("/Yoga/tjms2") > 0)
                {
                    ecr.data.results = Tobk_Logic.Get_tjms2_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_Rcbp(Auth auth, Rcbp request, Rcbp_Logic rcbp_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/rcbp1") > 0)
                {
                    ecr.data.results = rcbp_logic.Get_rcbp1_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

        public void TS_tjms(Auth auth, tjms request, tjms_logic tjms_logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/tjms1/confirm") > 0)
                {
                    ecr.data.results = tjms_logic.ConfirmAll_tjms1(request);
                }
               else if (uri.IndexOf("/Yoga/tjms1") > 0)
                {
                    ecr.data.results = tjms_logic.Get_tjms1_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }


        public void DownLoadImg(Auth auth, DownLoadImg request, DownLoadImg_Logic logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/Yoga/slide/attach") > 0)
                {
                    ecr.data.results = logic.Get_tjms1_Attach_List(request);
                }
                if (uri.IndexOf("/Yoga/tjms1/doc") > 0)
                {
                    //ecr.data.results = logic.Get_tjms1_Doc_List(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

    }
}
