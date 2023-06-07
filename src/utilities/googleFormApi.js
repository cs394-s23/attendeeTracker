import { pushDb, useDbData, pushUsertoDb, setDb } from "../utilities/firebase";


var YOUR_CLIENT_ID =
    "Insert ID here";
var YOUR_REDIRECT_URI = "https://onsite-ca39b.web.app";
// var YOUR_REDIRECT_URI = "http://localhost:5173";
var fragmentString = location.hash.substring(1);


export const notSignedIn = () => {
    var signedIn = localStorage.getItem("signedIn");
    return !signedIn || signedIn == false;
  };

const countAnswers = (e, questionId) => {
    var going = 0;
    var not_going = 0;
    var maybe = 0;
    var goingList = ""
    var not_goingList ="";
    var maybeList = "";
    var totalList = "";
    if (e.responses) {
        for (var i = 0; i < e.responses.length; i++) {
            if(!e.responses[i].answers.hasOwnProperty(questionId)) {
                maybe++;
                continue;
            }

            var ind_response =
                e.responses[i].answers[questionId].textAnswers.answers[0].value;
            if (ind_response == "Yes") {
                going = going + 1;
                goingList = goingList  + e.responses[i].respondentEmail + ",";
            }
            else if (ind_response == "No") {
                not_going = not_going + 1;
                not_goingList = not_goingList + e.responses[i].respondentEmail + ",";
            }
            else {
                maybe = maybe + 1;
                maybeList = maybeList + e.responses[i].respondentEmail  + ",";
            }
            totalList = totalList + e.responses[i].respondentEmail + ",";
        }

        var result = {};
        result["attending"] = going;
        result["maybe"] = maybe;
        result["not_attending"] = not_going;
        if(goingList.length > 0) result["attendingList"] = goingList.substring(0, goingList.length - 1);
        if(not_goingList.length > 0) result["not_attendingList"] = not_goingList.substring(0, not_goingList.length - 1);
        if(maybeList.length > 0) result["maybeList"] = maybeList.substring(0, maybeList.length - 1);
        result['totalList'] = totalList.substring(0, totalList.length - 1)
    } else {
        var result = {};
        result["attending"] = 0;
        result["maybe"] = 0;
        result["not_attending"] = 0;
        result['totalList'] = "";
    }
    
 
    return result;
};

const parseResponse = (e, v, isUserPresent, eventId) => {
    var e = JSON.parse(e);
    var v = JSON.parse(v);
    var data = {};
    data["name"] = e["info"]["title"];
    data["details"] = e.info.description;
    data["host"] = e.items[1].description;
    data["time"] = e.items[0].description;
    data["formId"] = e.formId;
    data["responderUri"] = e.responderUri

    var questionId = e.items[2].questionItem.question.questionId;
    var going = countAnswers(v, questionId);


    var reminder_going = {}
    if(e.items.length > 3) {

        var reminderId = e.items[3].questionItem.question.questionId;
        reminder_going = countAnswers(v, reminderId)
    }

    data["reminder_count"] = reminder_going


    data["count"] = going;
    var user = JSON.parse(localStorage.getItem("oauth2-test-params"))['user_id'];

    if(!isUserPresent) {
        console.log('user not present, adding to firebase')
        pushUsertoDb(user, "/" + user)
    }


    if(eventId != null) {
        data["key"] = eventId
        setDb(data, "/"+ user +"/" + eventId)
    }
    
    else pushDb(data, "/" + user + "/");
};



export const addReminder = (form) => {
    return new Promise(function (resolve, reject) {
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
        if (params && params["access_token"]) {
            var xhr = new XMLHttpRequest();

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
                    resolve(true)
                    console.log("api hit");
                } else if (xhr.readyState === 4 && xhr.status === 403) {
                    // Token invalid, so prompt for user permission.
                    // oauth2SignIn();
                    resolve(false)
                } else if (xhr.readyState === 4 && xhr.status === 401) {
                    // Token invalid, so prompt for user permission.
                    resolve(false)
                    // oauth2SignIn();
                }
            };
            xhr.send(JSON.stringify(body));
        } else {
            oauth2SignIn();
        }
});
};

export const getUserInfo = (params) => {
    if (params && params["access_token"]) {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open(
                "GET",
                "https://www.googleapis.com/oauth2/v1/userinfo?" +
                "access_token=" +
                params["access_token"]
            );
            xhr.onreadystatechange = function (i) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.response).id)
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
        // oauth2SignIn();
    }
}

export const trySampleRequest = (form, responsesOrForm, formDetails = null, isUserPresent = false, eventId = null) => {
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
        var xhr = new XMLHttpRequest();
        var responses = "?";
        if (responsesOrForm == false) {
            responses = "/responses?";
        }
        xhr.open(
            "GET",
            "https://forms.googleapis.com/v1/forms/" +
            form +
            responses +
            "access_token=" +
            params["access_token"]
        );
        xhr.onreadystatechange = function (i) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("api hit");
                if (responsesOrForm == false) {

                    parseResponse(formDetails, xhr.response, isUserPresent, eventId);
                }
                //   parseResponse(xhr.response);
                if (responsesOrForm == true) {

                    trySampleRequest(form, false, xhr.response, isUserPresent, eventId);
                }
            } else if (xhr.readyState === 4 && xhr.status === 403) {
                // Token invalid, so prompt for user permission.
                alert("Invalid Session, Please Sign In Again")
                // oauth2SignIn();
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                // Token invalid, so prompt for user permission.
                alert("Invalid Session, Please Sign In Again")
                // oauth2SignIn();
            }
        };
        xhr.send(null);
    } else {
        // oauth2SignIn();
    }
};

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export function oauth2SignIn() {
    return new Promise(function (resolve, reject) { 
        // Google's OAuth 2.0 endpoint for requesting an access token

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

    return new Promise(function (resolve, reject) {
        var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
        if (params && params["access_token"]) {
            resolve(true)
        }

        var params = {};
        var regex = /([^&=]+)=([^&]*)/g,
            m;
        while ((m = regex.exec(fragmentString))) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        if (Object.keys(params).length > 0) {
            getUserInfo(params).then( (id) => {
                params['user_id'] = id
                localStorage.setItem("oauth2-test-params", JSON.stringify(params));
                resolve(true)
            })
        }

    });
}

const signOut = () => {
    localStorage.removeItem("oauth2-test-params");

}