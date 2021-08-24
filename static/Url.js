const url = {
    post: {
        json: async function (url, body, headers = {}) {
            let PostHeaders = {"content-type": "application/json"};
            Object.assign(PostHeaders, headers);

            let data = await fetch(url, {
               method: "POST",
               headers: PostHeaders,
               body: JSON.stringify(body)
            });

            let ResBody = await data.json();
            data.body = ResBody;

            //Not rejecting, so you still get the data returned
            return data;
        }
    }
};