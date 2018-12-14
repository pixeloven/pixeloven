// import ExampleActionTypes from "@shared/store/Example/Example.actions";
// import {
//     makeGetCampaignDescription,
//     makeGetCampaignTitle,
// } from "@shared/store/Example/Example.selectors";
// import { State } from "@shared/store/types";
// import { connect } from "react-redux";
// import { Dispatch } from "redux";
// import CampaignPage, { CampaignPageProps } from "./CampaignPage";

// const makeMapStateToProps = () => {
//     const getCampaignDescription = makeGetCampaignDescription();
//     const getCampaignTitle = makeGetCampaignTitle();
//     const mapStateToProps = (state: State, ownProps: CampaignPageProps) => ({
//         description: getCampaignDescription(state),
//         title: getCampaignTitle(state),
//     });
//     return mapStateToProps;
// };

// const mapDispatchToProps = (
//     dispatch: Dispatch,
//     ownProps: CampaignPageProps,
// ) => ({
//     getCampaign: () => {
//         dispatch({
//             payload: ownProps.match.params.campaignUrl,
//             type: FeedActionTypes.GET_FEED_CAMPAIGN_IN_PROGRESS,
//         });
//     },
// });

// const CampaignPageConnect = connect(
//     makeMapStateToProps,
//     mapDispatchToProps,
// )(CampaignPage);

// export default CampaignPageConnect;
