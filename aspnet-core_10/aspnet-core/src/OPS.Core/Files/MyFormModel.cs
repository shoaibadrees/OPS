using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OPS.Files
{
    public class MyFormModel
    {
        public string TrustedFilePath { get; set; }
        public string TrustedFileName { get; set; }
        public string ScreenshotFilename { get; set; }
        public string ThumbnailFilename { get; set; }
        public string Guid { get; private set; } = System.Guid.NewGuid().ToString();

        public override string ToString()
        {
            return $"{nameof(TrustedFilePath)}: [{TrustedFilePath}];" + Environment.NewLine +
                   $"{nameof(Guid)}: {Guid}; ";
        }
    }
}
