import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <div className={utilStyles.lightText} >
      <Date dateString={postData.date}/>
    </div>
    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
    <br />
    {postData.id}
    <br />
    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
  </Layout>);
}

export async function getStaticPaths() {

  // get array of dynamic routes
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// params is the dynamic endpoint URL
// [id] = assigns the params object a key id where:
// params.id = endpoint URL entered in browser
export async function getStaticProps({ params }) {

  // grab the data file based on the param id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}