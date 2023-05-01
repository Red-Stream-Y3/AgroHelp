import { BlogTable } from '../../components';

const ManageBlogs = () => {
  return (
    <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl">
      <BlogTable header={'BLOGS'} title={'Blog'} />
    </div>
  );
};

export default ManageBlogs;
