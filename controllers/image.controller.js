class ImageController {
  upload_image = async (req, res) => {
    const imageUrl = req.img_url;
    if (imageUrl) {
      return res.status(200).json({ data: imageUrl });
    } else {
      return res.status(400).json({ errMsg: '이미지 업로드 실패' });
    }
  };
}

module.exports = ImageController;
