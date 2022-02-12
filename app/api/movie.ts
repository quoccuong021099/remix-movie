import { getComments } from './comments';

export type DataI = {
  recommendContentVOList: [];
};
export type DataA = {
  title: string;
};
export type ItemListTitle = {
  homeSectionId: number;
  homeSectionName: string;
};
export type MovieItemDetail = {
  id: number;
  category: string;
  coverHorizontalUrl: string;
  name: string;
};
export type MovieItem = {
  id: number;
  category: string;
  imageUrl: string;
  title: string;
};
export type PropMovieItem = {
  title: string;
  movies: any;
  homeSectionId: number;
  newTitle: string;
};

export async function getFilms(title?: string | null, page?: string | null) {
  const newPage = page && Number(page) >= 0 && Number(page) <= 8 ? page : 0;
  const response = await fetch(
    `https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=${newPage}`,
    {
      method: 'get',
      headers: {
        lang: 'vi',
        versioncode: '11',
        clienttype: 'ios_jike_default',
      },
    }
  );

  const films = await response.json();
  const listData = await films?.data?.recommendItems;
  let newArr;
  if (title) {
    newArr = await listData?.map((i: DataI) =>
      i?.recommendContentVOList?.filter((a: DataA) =>
        a?.title.toLowerCase().includes(title.toLowerCase())
      )
    );
  } else {
    newArr = listData;
  }
  return { newArr, title, listData, newPage };
}

export async function getFilmDetail(
  name?: string | null,
  cate?: string | null
) {
  const newCate = cate && Number(cate) >= 0 && Number(cate) <= 8 ? cate : 0;

  const response = await fetch(
    `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${name}&category=${newCate}`,
    {
      method: 'get',
      headers: {
        lang: 'vi',
        versioncode: '11',
        clienttype: 'ios_jike_default',
      },
    }
  );
  const films = await response.json();

  const comments = await getComments(name, newCate);

  if (!films.data) {
    throw new Response("Can't find film", { status: 404 });
  } else {
    return { films: films.data, comments };
  }
}
