import React from "react";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";

function Contacts() {
    const { t } = useTranslation();
return(
    <div>
        <Typography variant={"h5"}>{t("ContactUs.1")}</Typography>
        <Typography>
            {t("Phone.1")}: 0898898898
        </Typography>
        <Typography color={"initial"}>
            {t("Phone.1")}: 0898888888
        </Typography>
        <Typography>
            {t("Email.1")}: ivo_bg@abv.bg
        </Typography>
        <Typography>
            {t("Email.1")}: filian_bg@abv.bg
        </Typography>
    </div>
)


}
export default Contacts;