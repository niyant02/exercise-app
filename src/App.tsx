import { useState, useEffect } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import axios, { AxiosRequestConfig } from 'axios';
import PostItem from './components/PostItem';
import './App.scss';
import { Post } from './models/Post';
import PostPopup from './components/PostPopup';

type AppState = {
  items: Post[];
  limit: number;
  start: number;
  loading: boolean;
  item?: Post;
  modal: boolean;
};

function App() {
  const [state, setState] = useState<AppState>({
    items: [],
    limit: 10,
    start: 0,
    loading: true,
    item: undefined,
    modal: false,
  });

  useEffect(() => {
    fetchMoreData();
  }, []);

  // fetchMoreData()
  const fetchMoreData = async (start: number = 0) => {
    setState({
      ...state,
      loading: true,
    });
    let config: AxiosRequestConfig = {
      method: 'get',
      // url: 'https://vercel-express-liart.vercel.app/api/posts?start=0&limit=10',
      url: `https://jsonplaceholder.typicode.com/albums/1/photos?_start=${start}&_limit=${state.limit}`,
      headers: {},
    };

    await axios(config)
      .then((response) => {
        const oldItem = state.items;
        let posts = [];
        if (oldItem) {
          posts = [...oldItem, ...response.data];
        } else {
          posts = response.data;
        }

        setState({
          ...state,
          start,
          items: posts,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showDialog = (item: Post) => {
    setState({
      ...state,
      item,
      modal: true,
    });
  };

  const closeDialog = () => {
    setState({
      ...state,
      item: undefined,
      modal: false,
    });
  };

  const loadMoreData = async () => {
    const lastItem: any = state.items[state.items.length - 1];

    if (state.start !== lastItem.id) {
      await fetchMoreData(lastItem.id);
    }
  };

  return (
    <div className="App">
      <div className="bg-slate-100">
        <div
          id="scrollableDiv"
          className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 className="text-left text-2xl font-extrabold tracking-tight text-gray-900">
            Post List
          </h2>

          {/*Put the scroll bar always on the bottom*/}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <BottomScrollListener onBottom={loadMoreData} debounce={500} />
            {state.items.map((item: Post, index: number) => (
              <PostItem item={item} key={index} showModal={showDialog} />
            ))}
          </div>
        </div>
      </div>
      <PostPopup
        showModal={state.modal}
        setShowModal={closeDialog}
        item={state.item || undefined}
      />
    </div>
  );
}

export default App;
