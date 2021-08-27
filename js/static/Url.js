const url = {
    post: {
        json: async function (url, body = {}, headers = {})
        {
            let PostHeaders = { "content-type": "application/json" };
            Object.assign(PostHeaders, headers);

            let data = await fetch(url, {
                method: "POST",
                headers: PostHeaders,
                body: JSON.stringify(body)
            });

            let ResBody = await data.json();
            data.content = ResBody;

            //Not rejecting, so you still get the data returned
            return data;
        }
    },
    put: {
        json: async function (url, body = {}, headers = {})
        {
            let PutHeaders = { "content-type": "application/json" };
            Object.assign(PutHeaders, headers);

            let data = await fetch(url, {
                method: "PUT",
                headers: PutHeaders,
                body: JSON.stringify(body)
            });

            let ResBody = await data.json();
            data.content = ResBody;

            //Not rejecting, so you still get the data returned
            return data;
        }
    },
    get: {
        json: async function (url, headers = {})
        {
            let GetHeaders = {};
            Object.assign(GetHeaders, headers);

            let data = await fetch(url, {
                method: "GET",
                headers: GetHeaders
            });

            let ResBody = await data.json();
            data.content = ResBody;

            //Not rejecting, so you still get the data returned
            return data;
        }
    },
    delete: {
        json: async function (url, body = {}, headers = {}) {
            let DeleteHeaders = {"content-type": "application/json"};
            Object.assign(DeleteHeaders, headers);

            let data = await fetch(url, {
               method: "DELETE",
               headers: DeleteHeaders,
               body: JSON.stringify(body)
            });

            let ResBody = await data.json();
            data.content = ResBody;

            //Not rejecting, so you still get the data returned
            return data;
        }
    }
};