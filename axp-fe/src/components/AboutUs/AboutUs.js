import React, {Component} from "react";
import python_full_team from "../../assets/img/python-full-team.jpg";
import python_team_video from "../../assets/video/py-team-720p-15s.mp4";
import t from "./locale";


class AboutUs extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">{t("about_us")}
                            <hr/>
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={python_full_team} className="img-responsive img-thumbnail"
                             alt="Our team of developers"/>
                    </div>
                    <div className="col-md-4">
                        <p className="text-center team-members">
                            <strong>{t('team_lead')}:</strong>
                            <br/>
                            {t('yura_p')} {t('pyrko')}
                            <br/>
                            <br/>
                            <strong>{t('young_pythonistas')}:</strong> <br/>
                            <div className="col-md-6 text-right">{t('nastya')}</div>
                            <div className="col-md-6 text-left">{t('kovalyshyn')}</div>
                            <br/>
                            <div className="col-md-6 text-right">{t('yura')}</div>
                            <div className="col-md-6 text-left">{t('dudyshyn')}</div>
                            <br/>
                            <div className="col-md-6 text-right">{t('danylo')}</div>
                            <div className="col-md-6 text-left">{t('horyk')}</div>
                            <br/>
                            <div className="col-md-6 text-right">{t('ivan')}</div>
                            <div className="col-md-6 text-left">{t('prytula')}</div>
                            <br/>
                            <div className="col-md-6 text-right">{t('oleksiy')}</div>
                            <div className="col-md-6 text-left">{t('maksymiv')}</div>
                            <br/>
                            <div className="col-md-6 text-right">{t('vasyl')}</div>
                            <div className="col-md-6 text-left">{t('pyrih')}</div>
                            <br/>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <figure className="video">
                            <video width="100%" height="auto" controls>
                            <source src={python_team_video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </figure>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;
