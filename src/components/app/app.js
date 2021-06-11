import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";
import "./app.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: "React my frend...", important: true, like: false, id: 1 },
        { label: "React my love...", important: false, like: false, id: 2 },
        { label: "React my bitch...", important: false, like: false, id: 3 },
        { label: "React my tears...", important: false, like: false, id: 4 },
        { label: "React my sadness...", important: false, like: false, id: 5 },
        { label: "React my pride...", important: false, like: false, id: 6 },
        { label: "React my arsenal...", important: false, like: false, id: 7 },
      ],
      term: "",
      filter: "all",
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 8;
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

      return {
        data: newArr,
      };
    });
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const old = data[index];
      const newItem = { ...old, important: !old.important };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  }
  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const old = data[index];
      const newItem = { ...old, like: !old.like };

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ];
      return {
        data: newArr,
      };
    });
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1;
    });
  }

  filterPost(items, filter) {
    if (filter === "like") {
      return items.filter((item) => item.like);
    } else {
      return items;
    }
  }

  onUpdateSearch(term) {
    this.setState({ term });
  }

  onFilterSelect(filter) {
    this.setState({ filter });
  }

  render() {
    const { data, term, filter } = this.state;

    const liked = data.filter((item) => item.like).length;
    const allPosts = data.length;

    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div class="col-md-8 offset-md-2">
        <div>
          <AppHeader liked={liked} allPosts={allPosts} />
          <div className="search-panel d-flex">
            <SearchPanel onUpdateSearch={this.onUpdateSearch} />
            <PostStatusFilter
              filter={filter}
              onFilterSelect={this.onFilterSelect}
            />
          </div>
          <PostList
            posts={visiblePosts}
            onDelete={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleLiked={this.onToggleLiked}
          />
          <PostAddForm onAdd={this.addItem} />
        </div>
      </div>
    );
  }
}
