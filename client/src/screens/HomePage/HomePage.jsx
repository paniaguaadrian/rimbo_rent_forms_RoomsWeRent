// Custom Components
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Home from "../../components/Home/Home";
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";
import CustomHelmet from "../../components/Helmet/CustomHelmet";

// Multi language
import { withNamespaces } from "react-i18next";

// Images
import WeRentImage from "../../images/undraw_apartment_rent_o0ut.svg";

const HomePage = ({ t }) => {
  return (
    <>
      <CustomHelmet header={t("Home.header")} />
      <NavBar />
      <Home
        title={t("Home.title")}
        subtitle={t("Home.subtitle")}
        text={t("Home.text")}
        imageSRC={WeRentImage}
        imageAlt="Ukio image"
      />
      <Footer />
      <WhatsappBubble />
    </>
  );
};

export default withNamespaces()(HomePage);
