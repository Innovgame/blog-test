import React from "react";
import { Anchor } from "antd";
const { Link } = Anchor;

// 根据 article 来生成锚点列表
function getAnchorList(str) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g;
  let list = [];
  function pushItem(arr, item) {
    const len = arr.length;
    const matchItem = arr[len - 1];
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
      // debugger
    }
  }
  str.replace(pattern, ($0, $1) => {
    const title = $0.replace(/.*?>/, "");
    const href = `#${title.replace(/\s/g, "-")}`; // 转化为锚地可跳转的路径
    const currentItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: []
    };
    pushItem(list, currentItem);
  });
  return list;
}

const Navigation = ({ article }) => {
  const list = getAnchorList(article);
  function renderLink({ href, title, children }) {
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map(sub => renderLink(sub))}
      </Link>
    );
  }
  return <Anchor affix={false}>{list.map(renderLink)}</Anchor>;
};

export default Navigation;
