# Choti (blur) blog images ko AI (EDSR) se 2x bada aur saaf banata hai.
# Asli file waisi hi rehti hai; nayi file "-hd.jpg" naam se ban jati hai.
import cv2, sys, time
from cv2 import dnn_superres
sr = dnn_superres.DnnSuperResImpl_create()
sr.readModel('EDSR_x2.pb')
sr.setModel('edsr', 2)
for name in sys.argv[1:]:
    src = 'public/images/blog/wp/' + name
    dst = src.rsplit('.', 1)[0] + '-hd.jpg'
    t = time.time()
    out = sr.upsample(cv2.imread(src))
    cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 86, cv2.IMWRITE_JPEG_PROGRESSIVE, 1])
    print(dst, out.shape, round(time.time() - t), 's', flush=True)
