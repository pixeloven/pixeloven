import { HttpClient, Response } from "@shared/utils/HttpClient";
import * as React from "react";

interface State {
    lat: string;
    long: string;
}

class ApiExample extends React.Component<{}, State> {
    public getData() {
        const url = "http://api.open-notify.org/iss-now.json";

        HttpClient.get(url)
            .then((response: Response) => {
                this.setState({
                    lat: response.data.iss_position.latitude,
                    long: response.data.iss_position.longitude,
                });
            })
            .catch((error: Error) => {
                console.log(error.message);
            });
    }

    public componentDidMount() {
        this.getData();
    }

    public render() {
        return (
            <div>
                <strong>International Space Station</strong>
                <div>Current Position</div>
                <ul>
                    <li>Latitude: {this.state ? this.state.lat : ""}</li>
                    <li>Longitude: {this.state ? this.state.long : ""}</li>
                </ul>
            </div>
        );
    }
}

export default ApiExample;
