import { StoreInterface } from "@shared/store/rootReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Sagas, { SagasProps } from "./Sagas";

const mapStateToProps = (state: StoreInterface, ownProps: SagasProps) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    incrementAsync: () => {
        dispatch({ type: "INCREMENT_ASYNC" });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sagas);
