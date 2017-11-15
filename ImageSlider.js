import React, { Component } from 'react'
import {
    StyleSheet,
    ListView,
    View,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'

import ImageViewer from 'react-native-image-zoom-viewer'
import Gallery from 'react-native-image-gallery'

const imagesForGallery = [];
class ImageSlider extends Component {
    constructor(props) {
        super(props)

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state =  {
            dataSource: ds.cloneWithRows(this.props.objects),
            selectedIndex: 0,
            showModal: false,
            initialPage: 0,
        }
    }

    componentDidMount() {
        for (i = 0; i<this.props.objects.length; i++) {
            imagesForGallery.push({
                source: this.props.objects[i],
                dimensions: { width: 150, height: 150 }
            })
        }
        console.disableYellowBox = true;
    } 

    render() {
        return (
            <View>
                <ListView style={styles.container} horizontal = {true} showsHorizontalScrollIndicator={false}
                dataSource={this.state.dataSource} 
                renderRow={(rowData, sectionID, rowID) => this.renderObject(rowData, rowID)}
                />
                <Modal visible={this.state.showModal} transparent={true}>
                    <Gallery style={styles.gallery}
                        images={imagesForGallery}
                        index={this.state.selectedIndex}
                        initialPage={this.state.initialPage}
                    />
                    <TouchableOpacity style={styles.closeModal} onPress={() => this.hideModal() }>
                        <Image style={styles.closeImage} source={require("./images/closeButton.png")} />
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }

    renderObject = (rowData, rowIndex) => {
        return (
            <TouchableOpacity onPress={() => this.showModal(rowIndex)}>
                <Image style={styles.item} source={rowData} />
            </TouchableOpacity>
        );
    }

    showModal = (index) => {
        this.setState({
            showModal: true,
            initialPage: index
        });
    }
    
    hideModal = () => {
        this.setState({
            showModal: false,
        });
    }
}

export default ImageSlider;

const styles = {
    container: {
        width: '100%',
        height: 120,
    },
    item: {
        margin: 10,
        width: 100, 
        height: 100,
    },
    gallery: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    closeModal: {
        position: 'absolute',
        top: 30,
        left: 30,
        width: 30,
        height: 30,
    },
    closeImage: {
        width: 30,
        height: 30
    }
}
