import { Post } from '../models/Post';

type PostItemProps = {
  item: Post;
  key?: number;
  showModal: Function;
};

function PostItem({ item, showModal }: PostItemProps) {
  return (
    <>
      <div
        className="group relative rounded-md bg-white cursor-pointer"
        onClick={() => showModal(item)}
      >
        <div className="w-full min-h-50 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-md overflow-hidden group-hover:opacity-75 lg:h-50 lg:aspect-none">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 p-4 flex justify-between mb-4 text-center">
          <h3 className="text-sm text-gray-700 text-center">
            {/* @ts-ignore */}
            <span aria-hidden="true" className="absolute inset-0"></span>
            {item.title}
          </h3>
        </div>
      </div>
    </>
  );
}

export default PostItem;
