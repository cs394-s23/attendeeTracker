import { pushDb } from "../utilities/firebase";

var YOUR_CLIENT_ID =
    "830241005429-o7l0fqrcdqp9ef44qc8upa6j3510vbvr.apps.googleusercontent.com";
var YOUR_REDIRECT_URI = "http://localhost:5173";
var fragmentString = location.hash.substring(1);


const countAnswers = (e, questionId) => {
    var going = 0;
    var not_going = 0;
    var maybe = 0;
    // console.log(e);
    for (var i = 0; i < e.responses.length; i++) {
        var ind_response =
            e.responses[i].answers[questionId].textAnswers.answers[0].value;
        if (ind_response == "Yes") going = going + 1;
        else if (ind_response == "No") not_going = not_going + 1;
        else maybe = maybe + 1;
    }
    var result = {};
    result["attending"] = going;
    result["no_response"] = maybe;
    result["not_attending"] = not_going;

    return result;
};

const parseResponse = (e, v) => {
    // console.log(e);
    // console.log(v);
    var e = JSON.parse(e);
    var v = JSON.parse(v);
    var data = {};
    data["name"] = e["info"]["title"];
    data["details"] = e.info.description;
    data["host"] = e.items[1].description;
    data["time"] = e.items[0].description;
    data["formId"] = e.formId;

    console.log(data["details"]);
    var questionId = e.items[2].questionItem.question.questionId;
    var going = countAnswers(v, questionId);

    data["count"] = going;
    console.log(questionId);
    console.log(data);
    pushDb(data, "Events/");
};



export const addReminder = (form) => {
    // e.preventDefault();
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    var body = {
        requests: [
            {
                createItem: {
                    item: {
                        title: "Are you still going?",
                        questionItem: {
                            question: {
                                required: true,
                                choiceQuestion: {
                                    type: "RADIO",
                                    options: [
                                        {
                                            value: "Yes",
                                        },
                                        {
                                            value: "No",
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    location: {
                        index: 3,
                    },
                },
            },
        ],
    };
    // body = JSON.stringify(body)
    if (params && params["access_token"]) {
        var xhr = new XMLHttpRequest();

        console.log(params);
        console.log(body);
        xhr.open(
            "POST",
            "https://forms.googleapis.com/v1/forms/" +
            form +
            ":batchUpdate?" +
            "access_token=" +
            params["access_token"]
        );
        xhr.onreadystatechange = function (i) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("api hit");
            } else if (xhr.readyState === 4 && xhr.status === 403) {
                // Token invalid, so prompt for user permission.
                // oauth2SignIn();
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                // Token invalid, so prompt for user permission.
                oauth2SignIn();
            }
        };
        xhr.send(JSON.stringify(body));
    } else {
        oauth2SignIn();
    }
};

export const getUserInfo = (params) => {
    if (params && params["access_token"]) {

        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            console.log(params);
            xhr.open(
                "GET",
                "https://www.googleapis.com/oauth2/v1/userinfo?" +
                "access_token=" +
                params["access_token"]
            );
            xhr.onreadystatechange = function (i) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.response).email)
                    // resolve(xhr.response.email);
                } else if (xhr.readyState === 4 && xhr.status === 403) {
                    // Token invalid, so prompt for user permission.
                    // oauth2SignIn();
                } else if (xhr.readyState === 4 && xhr.status === 401) {
                    // Token invalid, so prompt for user permission.
                    // oauth2SignIn();
                }
            };
            xhr.send(null);
        });

    } else {
        // console.log('not logged in')
        // oauth2SignIn();
    }
}

export const trySampleRequest = (form, responsesOrForm, formDetails = null) => {
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
        console.log(params)
        var xhr = new XMLHttpRequest();
        var responses = "?";
        if (responsesOrForm == false) {
            responses = "/responses?";
        }
        console.log(params);
        xhr.open(
            "GET",
            "https://forms.googleapis.com/v1/forms/" +
            form +
            responses +
            //"https://www.googleapis.com/drive/v3/about?fields=user&" +
            "access_token=" +
            params["access_token"]
        );
        xhr.onreadystatechange = function (i) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("api hit");
                if (responsesOrForm == false) {
                    console.log(xhr.response);
                    parseResponse(formDetails, xhr.response);
                }
                //   parseResponse(xhr.response);
                if (responsesOrForm == true) {
                    console.log(xhr.response);
                    trySampleRequest(form, false, xhr.response);
                }
            } else if (xhr.readyState === 4 && xhr.status === 403) {
                // Token invalid, so prompt for user permission.
                // oauth2SignIn();
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                // Token invalid, so prompt for user permission.
                // oauth2SignIn();
            }
        };
        xhr.send(null);
    } else {
        // console.log('not logged in')
        // oauth2SignIn();
    }
};

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export function oauth2SignIn() {
    return new Promise(function (resolve, reject) { 
        // Google's OAuth 2.0 endpoint for requesting an access token
        // var url = "https://accounts.google.com/o/oauth2/v2/auth?" +
        // "scope=https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile&" + 
        // "include_granted_scopes=true&" +
        // "response_type=token&+"
        // "state=state_parameter_passthrough_value&"+
        // "redirect_uri=" + YOUR_REDIRECT_URI + "&"+
        // "client_id=" + YOUR_CLIENT_ID

        var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

        // Create element to open OAuth 2.0 endpoint in new window.
        var form = document.createElement("form");
        form.setAttribute("method", "GET"); // Send as a GET request.
        form.setAttribute("action", oauth2Endpoint);

        // Parameters to pass to OAuth 2.0 endpoint.
        var params = {
            client_id: YOUR_CLIENT_ID,
            redirect_uri: YOUR_REDIRECT_URI,
            scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile",
            state: "try_sample_request",
            include_granted_scopes: "true",
            response_type: "token",
        };

        // Add form parameters as hidden input values.
        for (var p in params) {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", p);
            input.setAttribute("value", params[p]);
            form.appendChild(input);
        }

        // Add form to page and submit it to open the OAuth 2.0 endpoint.
        document.body.appendChild(form);
        form.submit()

    });
}


export const saveToken = () => {

    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
        return true
    }

    var params = {};
    var regex = /([^&=]+)=([^&]*)/g,
        m;
    while ((m = regex.exec(fragmentString))) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
        console.log(params)
        getUserInfo(params).then( (email) => {
            params['email'] = email
            console.log(email)
            localStorage.setItem("oauth2-test-params", JSON.stringify(params));
            return true
        })
        // if (params["state"] && params["state"] == "try_sample_request") {
        //     return true
        // }
    }
    console.log(' no params ');
    return false;
}

const signOut = () => {
    localStorage.removeItem("oauth2-test-params");

}