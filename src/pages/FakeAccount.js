import React, { Fragment } from "react";
import {
  CopyInput,
  CustomButton,
  PhotoCircle,
  WorkAddressMap,
} from "../components";

const FakeAccount = ({ data }) => {
  return (
    <Fragment>
      <div className="bg-[#F7F7F7CC] py-5 px-8 mt-10 flex flex-col items-center gap-5">
        <h4 className="text-2xl font-bold text-[#237D31]">
          Generate Your Report
        </h4>
        <CustomButton>Cetak Pdf</CustomButton>
        <PhotoCircle srcImg={data.personal_profile_pic} />
        <div>
          <table>
            <tbody>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">Name :</td>
                <td className="p-2 w-1/2">{data.name ? data.name : "-"}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">
                  Phone Number :
                </td>
                <td className="p-2 w-1/2">
                  {data.phoneNumber ? data.phoneNumber : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">
                  Email Address :
                </td>
                <td className="p-2 w-1/2">{data.email ? data.email : "-"}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">
                  Home Address :
                </td>
                <td className="p-2 w-1/2">
                  {data.home_address ? data.home_address : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">
                  Work Address :
                </td>
                <td className="p-2 w-1/2">
                  {data.work_address ? data.work_address : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">IMEI :</td>
                <td className="p-2 w-1/2">
                  {data.imei_phone ? data.imei_phone : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">Phone Type :</td>
                <td className="p-2 w-1/2">
                  {data.phone_type ? data.phone_type : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">Latitude :</td>
                <td className="p-2 w-1/2">
                  {data.latitude ? data.latitude : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">Longitude :</td>
                <td className="p-2 w-1/2">
                  {data.longitude ? data.longitude : "-"}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right w-1/2">
                  Plus Code GPS :
                </td>
                <td className="p-2 w-1/2">
                  {data.gps_code ? data.gps_code : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h4 className="font-bold text-2xl text-black">Social Media Result</h4>
        <div className="mt-5">
          <h4 className="font-bold text-xl text-black mb-4">
            Facebook Account
          </h4>
          <CopyInput text={data.facebook_url} />
          {data.facebook_image ? (
            <div className="w-full h-auto mt-5">
              <img src={data.facebook_image} alt="facebook" className="w-3/4" />
            </div>
          ) : (
            "No Image For Facebook Page"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-black mb-4">Tiktok Account</h4>
          <CopyInput text={data.tiktok_url} />
          {data.tiktok_image ? (
            <div className="w-full h-auto mt-5">
              <img src={data.tiktok_image} alt="tiktok" className="w-3/4" />
            </div>
          ) : (
            "No Image For Tiktok Page"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-black mb-4">Twitter Account</h4>
          <CopyInput text={data.twitter_url} />
          {data.twitter_image ? (
            <div className="w-full h-auto mt-5">
              <img src={data.twitter_image} alt="twitter" className="w-3/4" />
            </div>
          ) : (
            "No Image For Twitter Page"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-black mb-4">YouTube Account</h4>
          <CopyInput text={data.youtube_url} />
          {data.youtube_image ? (
            <div className="w-full h-auto mt-5">
              <img src={data.youtube_image} alt="youtube" className="w-3/4" />
            </div>
          ) : (
            "No Image For YouTube Page"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-black mb-4">
            LinkedIn Account
          </h4>
          <CopyInput text={data.linkedin_url} />
          {data.linkedin_image ? (
            <div className="w-full h-auto mt-5">
              <img src={data.linkedin_image} alt="LinkedIn" className="w-3/4" />
            </div>
          ) : (
            "No Image For LinkedIn Page"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-center">Work Address</h4>
          {data.work_address ? (
            <WorkAddressMap workAddress={data.work_address} />
          ) : (
            "Not Available"
          )}
        </div>

        <div className="mt-10">
          <h4 className="font-bold text-xl text-center">Live Address</h4>
          {data.live_address_url ? (
            <WorkAddressMap workAddress={data.live_address_url} />
          ) : (
            "Not Available"
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default FakeAccount;
