import React from 'react';
import {FlatList, View} from 'react-native';
import styles from './styles';

export default class CustomFlatList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.viewabilityConfig = {
      minimumViewTime: 1,
      itemVisiblePercentThreshold: 100,
    };

    this.state = {
      stickyFooter: true,
    };
  }

  handleBottomStickyItem = info => {
    console.log(info);
    const {viewableItems} = info;
    const {stickyFooter} = this.state;
    const {stickyIndex} = this.props;

    const _stickyFooter =
      viewableItems[viewableItems.length - 1].index < stickyIndex;

    if (stickyFooter !== _stickyFooter) {
      this.setState({stickyFooter: _stickyFooter});
    }
  };

  getItemLayout = (data, index) => {
    const {itemHeight} = this.props;
    return {
      length: itemHeight,
      offset: itemHeight * index,
      index,
    };
  };

  render() {
    const {stickyFooter} = this.state;
    const {renderItem, data, stickyIndex, keyExtractor} = this.props;

    if (!data) {
      return null;
    }

    const stickyData =
      stickyIndex > data.length ? null : {item: data[stickyIndex]};

    return (
      <View style={styles.container}>
        <FlatList
          stickyHeaderIndices={[stickyIndex]}
          style={styles.list}
          data={data}
          renderItem={renderItem}
          getItemLayout={this.getItemLayout}
          onViewableItemsChanged={this.handleBottomStickyItem}
          initialNumToRender={5}
          removeClippedSubviews={true}
          keyExtractor={keyExtractor}
        />
        {stickyData && stickyFooter && (
          <View style={styles.stickyFooter}>{renderItem(stickyData)}</View>
        )}
      </View>
    );
  }
}
