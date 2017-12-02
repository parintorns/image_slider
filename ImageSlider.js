import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
  Image,
  Modal,
  BackHandler,
  ScrollView,
  Animated,
  Dimensions
} from "react-native";

const Images = [
  { image: require("./images/1.jpeg") },
  { image: require("./images/2.jpeg") },
  { image: require("./images/3.jpeg") },
  { image: require("./images/4.jpeg") },
  { image: require("./images/5.jpeg") },
  { image: require("./images/6.jpeg") }
];
import Carousel from "react-native-snap-carousel";

var { width, height } = Dimensions.get("window");

const imagesForGallery = [];
class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      initialPage: 0,
    };

    _scrollView: null;
  }

  componentDidMount() {
    for (i = 0; i < this.props.objects.length; i++) {
      imagesForGallery.push({
        source: this.props.objects[i],
        dimensions: { width: 150, height: 150 }
      });
    }
    console.disableYellowBox = true;
  }

  scrollHandler = e => {
    //    Alert.alert("" + e.nativeEvent.contentOffset.x);
    var index = parseInt((e.nativeEvent.contentOffset.x + 60) / 120, 10);
    var posX = index * 120;
    this._scrollView
      .getScrollResponder()
      .scrollTo({ x: posX, y: 0, animated: true });
  };

  render() {
    return <View>
        <ScrollView ref={view => (this._scrollView = view)} style={{ flexDirection: "row", width: "100%", height: 120 }} horizontal={true} showsHorizontalScrollIndicator={false} //snapToInterval={120}
          onScrollEndDrag={this.scrollHandler.bind(this)} scrollEventThrottle={16}>
          {this.props.objects.map((data, index) => {
            console.disableYellowBox = true;
            return this.renderObject(data, index);
          })}
        </ScrollView>
        <Modal visible={this.state.showModal} onRequestClose={this.hideModal}>
          <Carousel
                style={{ width:width, height: height}}
                data={this.props.objects}
                renderItem={this.renderItemView}
                sliderWidth={width}
                itemWidth={width}
                firstItem={this.state.initialPage}
                inactiveSlideOpacity={1}
                inactiveSlideScale={0.9}
            />
          <TouchableOpacity style={styles.closeModal} onPress={() => this.hideModal()}>
            <Image style={styles.closeImage} source={require("./images/closeButton.png")} />
          </TouchableOpacity>
        </Modal>
      </View>;
  }

  renderItemView = ({ item, index }) => {
    return <View style={styles.viewForPage}>
        <Image style={styles.imageForView} source={item} />
      </View>;
  };

  renderObject = (rowData, rowIndex) => {
    return (
      <TouchableOpacity onPress={() => this.showModal(rowIndex)}>
        <Image style={styles.item} source={rowData} />
      </TouchableOpacity>
    );
  };

  showModal = index => {
    this.setState({
      showModal: true,
      initialPage: index
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };
}

export default ImageSlider;

const styles = {
  container: {
    width: "100%",
    height: 120
  },
  viewForPage: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center',
    backgroundColor: "black"
  },
  imageForView: {
    width: width,
  },
  item: {
    margin: 10,
    width: 100,
    height: 100,
    resizeMode: "stretch"
  },
  gallery: {
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  },
  closeModal: {
    position: "absolute",
    top: 30,
    left: 30,
    width: 30,
    height: 30
  },
  closeImage: {
    width: 30,
    height: 30
  }
};
