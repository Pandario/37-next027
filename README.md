This is deployed on vercel redux toolkit [project](https://37-next027-redux.vercel.app/) 

We making requests for api server. use it to show posts normal and reverse. 
For now we fetching data once. but there is commented part, this one:

    // Uncomment the following lines to enable periodic fetching every 2 seconds
    // const intervalId = setInterval(() => {
    //   dispatch(fetchPosts());
    // }, 2000);

    // return () => clearInterval(intervalId);

    which allows us fetching data as much as we need.

    Last part - we can add/delete posts. They saved locally. If needed - quite fast it could rewritten to send/fetch data from db.
