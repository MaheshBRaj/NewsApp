import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: "general"

  }
  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
  }

  // async updateNews(){
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee8f64897c69407d89ad8efb96c3016a&page=${this.props.page}pageSize=${this.props.pageSize}`;
  //   this.setState({ loader: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json()

  //   this.setState({ 
  //     articles: parsedData.articles, 
  //     totalResults: parsedData.totalResults, 
  //     loader: false 
  //   })

  // }


  async componentDidMount() {
    // console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=ee8f64897c69407d89ad8efb96c3016a&page=1pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loader: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loader: false
    })


    // for (const key in parsedData.articles[0]) {
    //   console.log(parsedData.articles[0][key]);
    // }
    // this.updateNews();



  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=ee8f64897c69407d89ad8efb96c3016a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({ loader: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loader: false
    })
    // for updateNEwsMethod
    //   this.setState({page:this.state.page-1});
    //  this.updateNews();
  }
  handleNextClick = async () => {
    console.log("next");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=ee8f64897c69407d89ad8efb96c3016a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
      this.setState({ loader: true });
      let data = await fetch(url);
      let parsedData = await data.json()
      // console.log(parsedData); 
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loader: false
      })

      // for updateNEwsMW=ethod
      // this.setState({page:this.state.page+1});
      // this.updateNews();
    }
  }


// for infinite scroll
fetchMoreData =async () => {
  this.setState({page:this.state.page +1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=ee8f64897c69407d89ad8efb96c3016a&page=${this.state.page }&pageSize=${this.props.pageSize}&category=${this.props.category}`;
  this.setState({ loader: true });
  let data = await fetch(url);
  let parsedData = await data.json()

  this.setState({
    totalResults: parsedData.totalResults,
    articles: this.state.articles.concat (parsedData.articles),
    loader: false
  })

};


  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsApp-Top headlines</h1>
        {this.state.loader && <Spinner />}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner/>}
        > */}
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>	&larr;previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

