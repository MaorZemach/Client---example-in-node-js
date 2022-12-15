
main().then(response => (response));

async function main() {
    const axios = require('axios');

    const time = new Date();
    var curr_minutes = time.getMinutes();
    var curr_hours = time.getHours();
    let get_res = undefined;
    let post_res = undefined;
    let put_res = undefined;
    let delete_res = undefined;

    try {
        get_res = await axios.get('http://localhost:8989/test_get_method',
            {
                params: { "hour": curr_hours, "minute": curr_minutes }
            });
    }
    catch (err) {
        console.log(err)
        return 0;
    }

    console.log(get_res.data);
    try {
        post_res = await axios.post('http://localhost:8989/test_post_method',
            {
                hour: curr_hours,
                minute: curr_minutes,
                requestId: get_res.data,
            })
        console.log(post_res.data);
    }
    catch (err) {
        console.log(err)
        return 0;
    }
    try {
        put_res = await axios.put
            (
                'http://localhost:8989/test_put_method',
                {
                    hour: (curr_hours + 21) % 24,
                    minute: (curr_minutes + 13) % 60
                },
                { params: { id: post_res.data.message } }
            )
        console.log(put_res.data);
    }
    catch (err) {
        console.log(err)
        return 0;
    }
    try {
        delete_res = await axios.delete('http://localhost:8989/test_delete_method',
            {
                params: { id: put_res.data.message }
            })
        console.log(delete_res.data);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
    return 1;
}
