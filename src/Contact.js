import React from "react";
import katsuPhoto from "./img/katsuPhoto.jpg";
import TwitterIcon from "@mui/icons-material/Twitter";
import { blue } from "@mui/material/colors";

function Contact() {
  const TwitterLink = () => {
    window.location.href = "https://twitter.com/@Nissy_webCoder";
  };

  return (
    <div className="contact">
      <div className="contactBlock">
        <div className="contactText">
          本サイトのご意見・ご要望があればお手数ですが下記のTwitterアカウントにDMをお願いいたします。
        </div>
        <div className="Twitter" onClick={TwitterLink}>
          <TwitterIcon sx={{ color: blue[500] }} className="TwitterIcon" />
          <div className="TwitterText">Twitter</div>
        </div>
      </div>
      <div className="introduce">
        <div className="introIcon">
          <img src={katsuPhoto} alt="制作者アイコン" />
        </div>
        <div className="introName">Nissy</div>
        <div className="introText">
          当サイトを制作、運営しているNissyと申します。大学生から始めたプログラミングをどうすれば、誰かのために活かせるか考えている際、学生団体の先輩からアイデアをいただき約1ヶ月の開発期間を経てリリースすることができました。まだまだ実力不足ではありますが、これからも少しでも多くの人にショナメシの魅力がさらに広がりますよう開発者として努めてまいります。
        </div>
      </div>
    </div>
  );
}

export default Contact;
