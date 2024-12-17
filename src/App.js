import React, { Fragment, useState } from "react";
import {
  BarChart,
  BarDiagramChart,
  CloudyWords,
  CustomButton,
  DateRange,
  DoughnutChart,
  Dropdown,
  InputCustom,
  Loading,
  PhotoCircle,
  RadarChart,
  SlideOption,
} from "./components";
import FollowingsIcon from "./assets/images/followings-icon.png";
import FollowersIcon from "./assets/images/followers-icon.png";
import PostsIcon from "./assets/images/posts-icon.png";
import {
  getAccountSentiment,
  getMediaPost,
  getOnlineActivityByDay,
  getOnlineActivityByWeek,
  getPopularEmail,
  getPopularHashtag,
  getPopularKeyword,
  getPopularMention,
  getPopularPhoneNumber,
  getPostEngagement,
  getUserInfo,
} from "./services/api";
import { formatNumber } from "./utils/utils";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [dataProfile, setDataProfile] = useState({});
  const [isVerified, setIsVerified] = useState(0);
  const [rangeDate, setRangeDate] = useState();
  const [postEngagementData, setPostEngagementData] = useState([]);
  const [popularHashtagData, setPopularHashtagData] = useState([]);
  const [popularMentionData, setPopularMentionData] = useState([]);
  const [mediaPostData, setMediaPostData] = useState([]);
  const [popularKeywordData, setPopularKeywordData] = useState([]);
  const [popularEmailData, setPopularEmailData] = useState([]);
  const [popularPhoneNumberData, setPopularPhoneNumberData] = useState([]);
  const [sentimentAccount, setSentimentAccount] = useState({});
  const [onlineActivityData, setOnlineActivityData] = useState([]);
  const [onlineActivityWeekData, setOnlineActivityWeekData] = useState([]);

  const handleSelectType = (selected) => {
    setSelectedType(selected);

    if (selected === "akun") {
      setIsVerified(1);
    }
  };

  const handleSelectMedia = (selected) => {
    setSelectedMedia(selected);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleDateRangeChange = (selectedDates) => {
    const formattedDates = selectedDates.map((date) =>
      date ? new Date(date).toISOString().split("T")[0] : null
    );
    setRangeDate(formattedDates);
  };

  const handleSearchUserClick = async () => {
    if (!username || !selectedMedia || !rangeDate) {
      setError(true);
      return;
    }

    setDataProfile({});
    setPostEngagementData([]);
    setPopularHashtagData([]);
    setPopularMentionData([]);
    setMediaPostData([]);
    setPopularKeywordData([]);
    setPopularEmailData([]);
    setPopularPhoneNumberData([]);
    setSentimentAccount({});
    setOnlineActivityData([]);
    setOnlineActivityWeekData([]);
    setError(false);
    setLoading(true);
    try {
      const result = await getUserInfo(username, selectedMedia, isVerified);
      const dataEngagement = await getPostEngagement(
        result.id,
        rangeDate[0],
        rangeDate[1]
      );
      const popularHashtag = await getPopularHashtag(result.id);
      const popularMention = await getPopularMention(result.id);
      const mediaPost = await getMediaPost(result.id);
      const popularKeyword = await getPopularKeyword(result.id);
      const popularEmail = await getPopularEmail(result.id);
      const popularPhoneNumber = await getPopularPhoneNumber(result.id);
      const accountSentiment = await getAccountSentiment(result.id);
      const onlineActivity = await getOnlineActivityByDay(result.id);
      const onlineActivityWeek = await getOnlineActivityByWeek(result.id);

      setDataProfile(result);
      setPostEngagementData(dataEngagement);
      setPopularHashtagData(popularHashtag);
      setPopularMentionData(popularMention);
      setMediaPostData(mediaPost);
      setPopularKeywordData(popularKeyword);
      setPopularEmailData(popularEmail);
      setPopularPhoneNumberData(popularPhoneNumber);
      setSentimentAccount(accountSentiment);
      setOnlineActivityData(onlineActivity);
      setOnlineActivityWeekData(onlineActivityWeek);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const objectOpt = [
    { value: "akun", label: "Akun Sosial Media" },
    { value: "hashtag", label: "Hashtag / Mention" },
    { value: "fake", label: "Akun Fake (Avatar)" },
  ];

  const resourceOpt = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "x", label: "X" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("successLogin");
    window.location.reload();
  };

  return (
    <div className="px-10 py-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Pusat Riset Siber dan Analisis Informasi (PRISAI)
        </h1>
        <button onClick={handleLogout} className="font-bold text-blue-500">
          Logout
        </button>
      </div>

      <div className="bg-[#F7F7F7CC] p-5 flex items-center mt-4 h-72 gap-6">
        <div className="flex-1">
          <h2 className="text-3xl text-[#4D4D4D] font-semibold">
            Solusi Tepat Menganalisa Pengaruh{" "}
            <span className="text-[#237D31]">
              Akun, Hashtag & Fake Account (Avatar) Media Sosial
            </span>
          </h2>
          <p className="text-sm text-[#717171]">
            Where to grow your business as a photographer: site or social media?
          </p>
          <a
            href="/"
            className="inline-block bg-[#237D31] text-white py-2 px-4 text-sm mt-5"
          >
            Sign Up
          </a>
        </div>
        <div className="flex-1">
          <h2>Image</h2>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-row gap-5 items-center justify-between">
          <div className="w-full">
            <p className="mb-2">Pilih Tipe</p>
            <Dropdown
              options={objectOpt}
              onSelect={handleSelectType}
              errorCheck={error}
            />
          </div>
          {selectedType === "akun" ? (
            <div className="w-full">
              <p className="mb-2">Pilih Sosial Media</p>
              <Dropdown
                options={resourceOpt}
                onSelect={handleSelectMedia}
                errorCheck={error}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {selectedType === "akun" && (
          <div className="mt-5">
            <p className="mb-2">Masukkan Username</p>
            <InputCustom
              errorCheck={error}
              placeholder="Masukkan Username @"
              handleChangeInput={(e) => handleChangeUsername(e)}
            />
          </div>
        )}
        {selectedType === "hashtag" && (
          <div className="mt-5">
            <p className="mb-2">Masukkan Hashtag</p>
            <InputCustom
              errorCheck={error}
              placeholder="Masukkan Username @"
              handleChangeInput={(e) => handleChangeUsername(e)}
            />
          </div>
        )}
        <div className="mt-5">
          <p className="mb-2">Rentang Waktu</p>
          <DateRange onDateChange={handleDateRangeChange} errorCheck={error} />
        </div>
        <div className="mt-5">
          <CustomButton
            isDisabled={loading}
            handleOnClick={handleSearchUserClick}
          >
            {loading ? <Loading /> : "Cari"}
          </CustomButton>
        </div>
      </div>

      {selectedType === "akun" ? (
        <Fragment>
          <div
            className={`mt-5 bg-[#F7F7F7CC] py-20 px-7 flex gap-6 ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <div className="w-full flex flex-col justify-center items-center">
              <PhotoCircle srcImg={dataProfile?.profile_photo} />
              <div className="mt-2 text-center">
                <p>{dataProfile?.account_name || "-"}</p>
                <p>{dataProfile?.account_username || ""}</p>
                <p>{dataProfile?.account_biography || ""}</p>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center">
              <h4 className="text-[#237D31] text-3xl font-bold mb-5">
                Generate your report
              </h4>
              <div className="flex gap-5 ">
                <CustomButton>Cetak Pdf</CustomButton>
              </div>
              <div className="mt-14 flex gap-16">
                <div className="flex gap-4 items-center">
                  <img src={FollowingsIcon} className="w-14" alt="Following" />
                  <p className="text-xl font-bold">
                    {formatNumber(dataProfile?.total_following) || "-"} <br />
                    <span className="text-sm font-normal">Following</span>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <img src={FollowersIcon} className="w-14" alt="Followers" />
                  <p className="text-xl font-bold">
                    {formatNumber(dataProfile?.total_follower) || "-"} <br />
                    <span className="text-sm font-normal">Followers</span>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <img src={PostsIcon} className="w-14" alt="Total Posts" />
                  <p className="text-xl font-bold">
                    {formatNumber(dataProfile?.total_post) || "-"} <br />
                    <span className="text-sm font-normal">Total Posts</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="font-bold text-xl mb-5">
              Daily Posts and Engangements Performance{" "}
            </h1>
            {Array.isArray(postEngagementData) &&
            postEngagementData.length > 0 ? (
              <BarChart data={postEngagementData} />
            ) : (
              <p>No Data to display</p>
            )}
          </div>

          <div className="mt-8 flex gap-5 bg-[#F7F7F7CC] p-20">
            <div className="flex-1">
              <h1 className="font-bold text-xl mb-5 text-center">
                Most Popular Hashtag
              </h1>
              {Object.keys(popularHashtagData).length !== 0 ? (
                <div className="mt-14 flex justify-center">
                  <DoughnutChart
                    data={popularHashtagData.data}
                    showLegend={false}
                  />
                </div>
              ) : (
                <div className="text-center">No data to display</div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-xl mb-5">Most Popular Mention</h1>
              {Array.isArray(popularMentionData) &&
              popularMentionData.length > 0 ? (
                <SlideOption options={popularMentionData} labelKey="mention" />
              ) : (
                <p>No Popular Hashtag to display</p>
              )}
            </div>
          </div>

          <div className="mt-8 bg-[#F7F7F7CC] p-5">
            <h1 className="font-bold text-xl mb-5">
              Postingan dengan likes tertinggi oleh profil yang dicari
            </h1>
            {mediaPostData.length > 0
              ? mediaPostData.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-10 items-center mb-5">
                      <div
                        style={{
                          width: "200px",
                          height: "150px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.images}
                          alt={item.images}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <input
                        readOnly
                        value={item.url}
                        className="p-2 bg-white border rounded-md border-black w-full mb-5"
                      />{" "}
                      <p className="mb-5 flex items-center gap-2 font-bold text-xl">
                        {formatNumber(item.likes)} <span>Likes</span>
                      </p>
                    </div>
                  );
                })
              : "No data to display"}
          </div>

          <div className="mt-5 flex gap-2 justify-evenly px-20">
            <div className="flex-1">
              <h1 className="font-bold text-xl mb-5">Most Popular Email</h1>
              {Array.isArray(popularEmailData) &&
              popularEmailData.length > 0 ? (
                <SlideOption options={popularEmailData} labelKey="email" />
              ) : (
                <p>No Popular Email to display</p>
              )}
            </div>

            <div className="flex-1">
              <h1 className="font-bold text-xl mb-5">
                Most Popular Phone Number
              </h1>
              {Array.isArray(popularPhoneNumberData) &&
              popularPhoneNumberData.length > 0 ? (
                <SlideOption
                  options={popularPhoneNumberData}
                  labelKey="phonenumber"
                  showTotal={false}
                />
              ) : (
                <p>No Popular Phone Number to display</p>
              )}
            </div>
          </div>

          <div className="mt-20">
            <h1 className="font-bold text-3xl mb-5 text-center">
              Most Popular Keywords
            </h1>
            {popularKeywordData.length > 0 ? (
              <CloudyWords wordsData={popularKeywordData} />
            ) : (
              <div className="text-center">No data available</div>
            )}
          </div>

          <div className="mt-10">
            <div className="text-center">
              <h1 className="font-bold text-xl mb-5">Sentiment</h1>
              <p className="text-xl">Sentiment mengenai profil yang dicari</p>
            </div>
            {Object.keys(sentimentAccount).length !== 0 ? (
              <div className="bg-white mt-14 flex justify-center">
                <DoughnutChart data={sentimentAccount.data} />
              </div>
            ) : (
              <div className="text-center">No data to display</div>
            )}
          </div>

          <div className="mt-32">
            <h4 className="font-bold text-xl">Content Post Summary</h4>
            <h4 className="font-bold text-xl">Executive Summary </h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Kompilasi teks ini berisi pengumuman tentang acara politik
                  yang akan datang dan wawancara, seperti penampilan Luluk Nur
                  Hamidah dan Lukmanul Khakim, calon gubernur dan wakil gubernur
                  Jawa Timur, dalam program Narasi, serta acara Mata Najwa on
                  Stage di Manado. Selain itu juga menyoroti acara LIVE
                  Musyawarah Pelantikan DPR, DPD, dan MPR RI yang menghadirkan
                  Bintang Emon, David Nurbianto, Dany Beler, dan Bivitri
                  Susanti. Selain itu, Najwa Shihab ditampilkan sebagai ikon di
                  Harper's Bazaar Indonesia. Terakhir, terdapat informasi
                  mengenai calon gubernur Sumatera Utara, termasuk Bobby-Surya
                  dan Edy-Hasan. <br />
                  <br /> Laporan ini menganalisis pernyataan-pernyataan yang
                  dibuat oleh Najwa Shihab mengenai berbagai topik, termasuk
                  peristiwa politik, isu-isu terkini, dan acaranya di Narasi TV.
                  Tujuan dari investigasi ini adalah untuk mendapatkan wawasan
                  tentang pandangan Najwa Shihab dengan memeriksa unggahan media
                  sosialnya. Temuan utama mengungkapkan peran aktif Najwa dalam
                  meliput acara-acara politik, seperti siaran langsung dari DPR
                  RI dan diskusi yang menampilkan kandidat gubernur Jawa Timur.
                  Mengingat pengaruh Najwa yang signifikan di Indonesia,
                  pernyataan-pernyataannya berpotensi membentuk opini publik.
                  Namun, penting untuk berhati-hati ketika hanya mengandalkan
                  satu sumber informasi.
                  <br />
                  <br /> Tweet Najwa Shihab mencakup berbagai topik, termasuk
                  acara politik yang akan datang, wawancara dengan tokoh-tokoh
                  politik, dan berita terbaru di Indonesia. Kicauan-kicauan ini
                  memberikan wawasan yang berharga
                  <br />
                  <br /> Translated with DeepL.com (free version)
                </p>
              </div>
              <div>
                <p>
                  This text compilation includes announcements about upcoming
                  political events and interviews, such as the appearance of
                  Luluk Nur Hamidah and Lukmanul Khakim, candidates for governor
                  and vice governor of East Java, on the program Narasi, as well
                  as the Mata Najwa on Stage show in Manado. It also highlights
                  the LIVE Musyawarah Pelantikan DPR, DPD, and MPR RI event
                  featuring Bintang Emon, David Nurbianto, Dany Beler, and
                  Bivitri Susanti. Additionally, Najwa Shihab is featured as an
                  icon in Harper's Bazaar Indonesia. Finally, there is
                  information about the gubernatorial candidates for North
                  Sumatra, including Bobby-Surya and Edy-Hasan.
                  <br />
                  <br /> This report analyzes statements made by Najwa Shihab on
                  various topics, including political events, current affairs,
                  and her show on Narasi TV. The goal of this investigation was
                  to gain insights into Najwa Shihab's views by examining her
                  social media posts. Key findings reveal Najwa's active role in
                  covering political events, such as live broadcasts from the
                  Indonesian Parliament and discussions featuring East Java
                  gubernatorial candidates. Given Najwa's significant influence
                  in Indonesia, her statements have the potential to shape
                  public opinion. However, it's essential to be cautious when
                  relying solely on one source for information.
                  <br />
                  <br /> Najwa Shihab's tweets cover a wide range of topics,
                  including upcoming political events, interviews with political
                  figures, and updates on Indonesian news. These tweets provide
                  valuable insights into current affairs, touching on both
                  political and social issues, such as intolerance and violence.
                  Although the tweets do not explicitly suggest specific
                  actions, they leave it to the reader to reflect on the
                  importance of these events and their potential impact on
                  Indonesian society. However, the core message emphasizes the
                  need to stay informed and actively engage in the political
                  process, particularly in light of the upcoming elections.
                  Overall, these tweets highlight the ongoing need to pay
                  attention to both political and social developments in
                  Indonesia.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">Purpose of Analysis</h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Postingan yang dianalisis berisi komentar Najwa Shihab tentang
                  berbagai peristiwa langsung, perkembangan politik, dan isu-isu
                  sosial di Indonesia. Meskipun konteks dari setiap
                  pernyataannya tidak selalu jelas, tujuan dari investigasi ini
                  adalah untuk memahami tujuan dan dampak dari
                  pernyataan-pernyataannya terhadap opini publik, terutama di
                  kalangan anak muda Indonesia dan pengguna media sosial.
                </p>
              </div>
              <div>
                <p>
                  The analyzed posts contain Najwa Shihab's comments on various
                  live events, political updates, and social issues in
                  Indonesia. Although the context for each statement is not
                  always fully clear, the purpose of this investigation is to
                  understand the objectives and impact of her statements on
                  public opinion, especially among younger Indonesians and
                  social media users.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">Key Insight and Data</h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Analisis terhadap akun Twitter Najwa Shihab menunjukkan
                  keterlibatan aktifnya dalam mendiskusikan peristiwa-peristiwa
                  politik, acara-acara TV, dan interaksi pribadi. Tweet-nya
                  mencakup topik-topik seperti Pilkada Sumut, siaran langsung
                  dari DPR RI, dan wawancara dengan tokoh-tokoh publik.
                  Unggahan-unggahan ini menunjukkan pengaruh Najwa yang cukup
                  besar dalam membentuk percakapan seputar isu-isu politik dan
                  sosial utama di Indonesia.
                </p>
              </div>
              <div>
                <p>
                  An analysis of Najwa Shihab's Twitter account reveals her
                  active engagement in discussing political events, TV shows,
                  and personal interactions. Tweets cover topics such as Sumut's
                  local elections, live broadcasts from the Indonesian
                  Parliament, and interviews with public figures. These posts
                  demonstrate Najwa's considerable influence in shaping
                  conversations around key political and social issues in
                  Indonesia.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">
              Data Interpretation and Examination:
            </h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Peran Najwa Shihab dalam lanskap politik Indonesia terlihat
                  jelas dari aktivitas media sosialnya, di mana ia membahas
                  pemilihan umum, masalah korupsi, dan kebijakan pemerintah.
                  Dengan jumlah pengikutnya yang besar, ia memiliki kekuatan
                  untuk mempengaruhi wacana publik tentang hal-hal yang mendesak
                  ini.
                </p>
              </div>
              <div>
                <p>
                  Najwa Shihab's role in the Indonesian political landscape is
                  evident from her social media activity, where she discusses
                  elections, corruption issues, and government policies. With
                  her large following, she has the power to influence public
                  discourse on these pressing matters.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">Validation of Sources</h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Meskipun sumbernya adalah media sosial, Najwa Shihab adalah
                  figur publik yang terkenal dan tepercaya. Meskipun demikian,
                  sangat penting untuk memeriksa ulang informasi dari berbagai
                  sumber untuk memastikan keakuratan dan keandalannya.
                </p>
              </div>
              <div>
                <p>
                  While the source is social media, Najwa Shihab is a well-known
                  and trusted public figure. Nonetheless, it is crucial to
                  cross-check information from multiple sources to ensure its
                  accuracy and reliability.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">
              Threat and Potential Consequences Assessment
            </h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Isu-isu yang diangkat oleh postingan Najwa Shihab dapat
                  menimbulkan risiko, seperti ketidakstabilan politik atau
                  perubahan peraturan yang dapat berdampak pada masyarakat yang
                  lebih luas. Investigasi lebih lanjut disarankan untuk menilai
                  implikasi yang lebih dalam dari pernyataannya.
                </p>
              </div>
              <div>
                <p>
                  The issues raised by Najwa Shihab's posts could present risks,
                  such as political instability or regulatory changes that might
                  impact broader society. Further investigation is recommended
                  to assess the deeper implications of her statements.
                </p>
              </div>
            </div>

            <h4 className="font-bold text-xl mt-16">Insights Gained</h4>
            <div className="flex gap-12">
              <div>
                <p>
                  Dari analisis terhadap unggahan media sosial Najwa Shihab, ada
                  beberapa pelajaran yang muncul. Salah satu pelajaran utama
                  adalah pentingnya memverifikasi informasi dari berbagai
                  sumber. Meskipun postingan tersebut memberikan detail yang
                  berguna, informasi tersebut mungkin tidak selalu lengkap atau
                  sepenuhnya akurat. Pelajaran penting lainnya adalah perlunya
                  memahami konteks di balik informasi tersebut. Beberapa tulisan
                  merujuk pada peristiwa tertentu, seperti pelantikan DPR, DPD,
                  dan MPR RI, yang membutuhkan latar belakang pengetahuan
                  tambahan untuk memahami informasi tersebut. Penting juga untuk
                  mewaspadai potensi bias atau agenda pribadi, karena
                  unggahan-unggahan ini mencerminkan pandangan Najwa Shihab.
                  Dalam melakukan investigasi OSINT, sangat penting untuk
                  mengumpulkan informasi dari berbagai sumber dan
                  menganalisisnya secara kritis untuk memastikan keakuratan dan
                  pemahaman yang menyeluruh.
                </p>
              </div>
              <div>
                <p>
                  From analyzing Najwa Shihab's social media posts, several
                  insights emerged. One key lesson is the importance of
                  verifying information from multiple sources. While the posts
                  provide useful details, they may not always be complete or
                  entirely accurate. Another important takeaway is the need to
                  understand the context behind the information. Some posts
                  refer to specific events, such as the inauguration of the DPR,
                  DPD, and MPR RI, which require additional background knowledge
                  for full comprehension. It's also crucial to be aware of
                  potential bias or personal agendas, as these posts reflect
                  Najwa Shihab's views. In conducting OSINT investigations, it
                  is essential to gather information from diverse sources and
                  critically analyze it to ensure accuracy and a well-rounded
                  understanding.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-28">
            <h4 className="font-bold text-center text-xl mb-5">
              Online Activity By Day
            </h4>
            {onlineActivityData.length > 0 ? (
              <div className="w-full flex justify-center text-center">
                <div className="w-1/2">
                  <RadarChart data={onlineActivityData} />
                </div>
              </div>
            ) : (
              <div>No data available</div>
            )}
          </div>

          <div className="mt-28">
            <h4 className="font-bold text-center text-xl mb-5">
              Online Activity By Week
            </h4>
            {onlineActivityWeekData.length > 0 ? (
              <div className="w-full flex justify-center text-center">
                <div className="w-1/2">
                  <BarDiagramChart data={onlineActivityWeekData} />
                </div>
              </div>
            ) : (
              <div>No data available</div>
            )}
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
