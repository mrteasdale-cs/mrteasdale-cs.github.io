'use strict';

import { def, examTip, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function igcseU1LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Why Binary?',
      p('Computers are built from billions of electronic switches that are either <strong>on</strong> (1) or <strong>off</strong> (0). Because only two states are possible, computers use the <strong>binary (base-2) number system</strong> to represent all data: numbers, text, images, sound, and programs.'),
      def('Binary', 'A base-2 number system using only the digits 0 and 1. Each digit is called a bit (binary digit).')
    )}
    ${section('Bits, Nibbles, and Bytes',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Term</th><th>Size</th><th>Combinations</th></tr></thead>
        <tbody>
          <tr><td><strong>Bit</strong></td><td>1 binary digit (0 or 1)</td><td>2</td></tr>
          <tr><td><strong>Nibble</strong></td><td>4 bits</td><td>16</td></tr>
          <tr><td><strong>Byte</strong></td><td>8 bits</td><td>256</td></tr>
        </tbody>
      </table></div>`,
      tip('With <em>n</em> bits you can represent <strong>2<sup>n</sup></strong> different values. 8 bits → 2<sup>8</sup> = 256 values (0–255).')
    )}
    ${section('Storage Units',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Unit</th><th>Abbreviation</th><th>Approximate size</th></tr></thead>
        <tbody>
          <tr><td>Kilobyte</td><td>KB</td><td>1,024 bytes</td></tr>
          <tr><td>Megabyte</td><td>MB</td><td>1,024 KB</td></tr>
          <tr><td>Gigabyte</td><td>GB</td><td>1,024 MB</td></tr>
          <tr><td>Terabyte</td><td>TB</td><td>1,024 GB</td></tr>
        </tbody>
      </table></div>`,
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>File type</th><th>Typical size</th></tr></thead>
        <tbody>
          <tr><td>One character of text</td><td>1 byte</td></tr>
          <tr><td>Full page of text</td><td>~30 KB</td></tr>
          <tr><td>Small digital photo</td><td>~3 MB</td></tr>
          <tr><td>Music CD</td><td>~600 MB</td></tr>
          <tr><td>DVD film</td><td>~4.5 GB</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Binary to Denary Conversion',
      p('Binary uses powers of 2. Write out the column headings right-to-left (1, 2, 4, 8, 16, 32, 64, 128), then add up the columns where there is a 1:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        </tbody>
      </table></div>`,
      p('1×128 + 1×16 + 1×4 + 1×2 = <strong>150</strong>'),
      examTip('Show your working in exam questions: write out all 8 column headings and tick the 1s. This earns method marks even if your final answer has an arithmetic slip.')
    )}
    ${section('Denary to Binary Conversion',
      p('Working from the largest power of 2 downwards, check if each power fits into the remaining number:'),
      p('Convert 57 to binary: 57 ≥ 32 ✓, remainder 25. 25 ≥ 16 ✓, remainder 9. 9 ≥ 8 ✓, remainder 1. 1 ≥ 1 ✓.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
        </tbody>
      </table></div>`,
      p('Result: <strong>00111001</strong>')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Binary','Base-2 number system using 0 and 1.'],
          ['Bit','A single binary digit (0 or 1).'],
          ['Byte','8 bits: can represent 256 different values.'],
          ['Denary','Base-10 number system (everyday counting).'],
          ['Register','A small, fast memory location inside the CPU storing binary values.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('What is Hexadecimal?',
      p('<strong>Hexadecimal</strong> (hex) is a base-16 number system. Because we only have 10 digits (0–9), it uses letters A–F for the values 10–15.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Denary</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th></tr></thead>
        <tbody>
          <tr><td><strong>Hex</strong></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
        </tbody>
      </table></div>`,
      def('Hexadecimal', 'A base-16 number system using digits 0–9 and letters A–F, where each hex digit represents exactly 4 binary bits (a nibble).')
    )}
    ${section('Why Use Hexadecimal?',
      `<div class="two-col-list">
        ${[
          ['Compact','One hex digit represents exactly 4 bits: a byte needs only 2 hex digits instead of 8 binary digits.'],
          ['Readable','Easier to read and remember than long binary strings.'],
          ['Error reduction','Less chance of making a mistake typing 2 hex chars than 8 binary digits.'],
          ['Easy binary conversion','Conversion between hex and binary is fast and exact.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Binary ↔ Hexadecimal Conversion',
      h3('Binary to Hex'),
      p('Split the 8-bit byte into two nibbles (groups of 4 bits), convert each nibble to its hex value:'),
      p('<code>1110 0101</code> → <code>E</code> and <code>5</code> → <strong>E5</strong>'),
      h3('Hex to Binary'),
      p('Replace each hex digit with its 4-bit binary equivalent:'),
      p('<code>3B</code> → <code>3 = 0011</code>, <code>B = 1011</code> → <strong>0011 1011</strong>'),
      examTip('Remember the split: 1 hex digit = 4 bits (nibble). Two hex digits = 1 byte (8 bits). This is always the conversion trick.')
    )}
    ${section('Denary ↔ Hexadecimal Conversion',
      h3('Denary to Hex'),
      p('Divide the denary number by 16. The quotient is the left hex digit, the remainder is the right hex digit:'),
      p('Denary 44 ÷ 16 = 2 remainder 12 → hex digit for 12 = C → result: <strong>2C</strong>'),
      h3('Hex to Denary'),
      p('Multiply the left digit by 16, add the right digit:'),
      p('Hex 2A → (2 × 16) + 10 = 32 + 10 = <strong>42</strong>')
    )}
    ${section('Where is Hex Used?',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Application</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Colour codes (HTML/CSS)</strong></td><td><code>#FF5733</code> = RGB(255, 87, 51)</td></tr>
          <tr><td><strong>MAC addresses</strong></td><td><code>4A:32:BE:5D:A4:4F</code>: 48-bit device identifier</td></tr>
          <tr><td><strong>Memory debugging</strong></td><td>RAM dumps in hex are far more readable than binary</td></tr>
          <tr><td><strong>IPv6 addresses</strong></td><td><code>2001:0db8:85a3:0000:...</code></td></tr>
          <tr><td><strong>Error codes</strong></td><td>Windows BSOD codes like <code>0x0000007B</code></td></tr>
        </tbody>
      </table></div>`,
      tip('Web colours: each colour (red, green, blue) has a value 0–255, written as two hex digits. <code>#FF0000</code> = pure red, <code>#00FF00</code> = pure green, <code>#0000FF</code> = pure blue.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Hexadecimal','Base-16 number system using 0–9 and A–F.'],
          ['Nibble','4 bits: represented by a single hex digit.'],
          ['RGB','Red, Green, Blue: each channel 0–255 (two hex digits).'],
          ['MAC address','48-bit hardware identifier shown as 6 hex pairs.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Representing Text',
      p('Computers only understand 0s and 1s. To represent text, we assign a unique binary code to every character: letters, digits, punctuation, and spaces.'),
      def('ASCII', 'American Standard Code for Information Interchange. A 7-bit code that maps 128 characters (letters, digits, symbols, control characters) to binary values 0–127.')
    )}
    ${section('ASCII Details',
      p('ASCII was developed in the 1960s and encodes:'),
      `<div class="two-col-list">
        ${[
          ['26 uppercase letters','A–Z (codes 65–90)'],
          ['26 lowercase letters','a–z (codes 97–122)'],
          ['10 digit characters','0–9 (codes 48–57)'],
          ['33 special characters','Punctuation, space, etc.'],
          ['33 control characters','Non-printable (e.g. newline, tab)'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Character</th><th>Denary</th><th>Binary (7-bit)</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>65</td><td>1000001</td></tr>
          <tr><td>a</td><td>97</td><td>1100001</td></tr>
          <tr><td>0</td><td>48</td><td>0110000</td></tr>
          <tr><td>Space</td><td>32</td><td>0100000</td></tr>
        </tbody>
      </table></div>`,
      tip('Uppercase "A" (65) and lowercase "a" (97) differ by 32. This pattern holds for all letters: to convert case, add or subtract 32.')
    )}
    ${section('7-bit vs 8-bit ASCII',
      p('Original ASCII used <strong>7 bits</strong> giving 128 characters: enough for English. The <strong>eighth bit</strong> was added to give 256 characters (extended ASCII), allowing special characters like © (169), ® (174), and accented letters like á, à, ä.'),
      examTip('Know the capacities: 7-bit = 128 characters, 8-bit = 256 characters, 16-bit (Unicode) = 65,536 characters.')
    )}
    ${section('ASCII Numbers vs Binary Numbers',
      p('The ASCII code for the character <code>"7"</code> is 55 (binary 0110111): <em>not</em> the same as the pure binary value 7 (0000111). This is important when doing arithmetic: you cannot add ASCII character codes directly.'),
      p('In Python, all keyboard input arrives as a string. You must convert it to an integer first: <code>x = int(input())</code>.')
    )}
    ${section('Unicode',
      def('Unicode', 'A 16-bit (and beyond) character encoding standard that provides a unique binary code for every character in every written language worldwide: over 1 million possible characters.'),
      p('Unicode gives 65,536 possible combinations in 16-bit form: enough for every character in every human language: Chinese, Arabic, Greek, emoji, and more. It is now the standard for the web.'),
      tip('ASCII is a subset of Unicode. The first 128 Unicode code points (0–127) match ASCII exactly.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['ASCII','7-bit code for 128 characters (standard keyboard).'],
          ['Extended ASCII','8-bit code for 256 characters (adds special symbols).'],
          ['Unicode','16-bit+ encoding for every character in every language.'],
          ['Character code','The binary/denary value assigned to a specific character.'],
          ['Concatenation','Joining two strings together (not arithmetic addition).'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l4': return `
    ${section('Bitmap Images',
      p('Digital images are stored as a grid of <strong>pixels</strong> (picture elements). Each pixel is a single colour, represented by a binary value.'),
      def('Pixel', 'The smallest identifiable area of a bitmap image. Each pixel has a single colour value stored in binary.'),
      def('Bitmap (Raster) Image', 'An image made up of a grid of pixels, where each pixel\'s colour is stored as a binary value.')
    )}
    ${section('Colour Depth',
      p('<strong>Colour depth</strong> (bit depth) is the number of bits used to store each pixel\'s colour. More bits = more possible colours:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Bits per pixel</th><th>Possible colours</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>2 (black and white)</td></tr>
          <tr><td>2</td><td>4</td></tr>
          <tr><td>4</td><td>16</td></tr>
          <tr><td>8</td><td>256</td></tr>
          <tr><td>24</td><td>16,777,216 (~16 million: "true colour")</td></tr>
        </tbody>
      </table></div>`,
      def('Colour Depth', 'The number of bits used to represent the colour of each pixel. Higher colour depth = more colours = larger file size.')
    )}
    ${section('RGB Colour Model',
      p('24-bit colour uses three channels: <strong>Red, Green, Blue</strong>: each with 8 bits (0–255). Any colour can be mixed from these three:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Colour</th><th>R</th><th>G</th><th>B</th><th>Hex</th></tr></thead>
        <tbody>
          <tr><td>Pure Red</td><td>255</td><td>0</td><td>0</td><td>#FF0000</td></tr>
          <tr><td>Pure Green</td><td>0</td><td>255</td><td>0</td><td>#00FF00</td></tr>
          <tr><td>White</td><td>255</td><td>255</td><td>255</td><td>#FFFFFF</td></tr>
          <tr><td>Black</td><td>0</td><td>0</td><td>0</td><td>#000000</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Image Resolution and File Size',
      def('Resolution', 'The number of pixels in an image, expressed as width × height (e.g. 1920 × 1080). Higher resolution = more detail = larger file.'),
      p('<strong>File size formula:</strong>'),
      p('File size (bits) = image width (px) × image height (px) × colour depth (bits)'),
      p('Example: 1000 × 750 pixels at 24-bit colour = 1000 × 750 × 24 = 18,000,000 bits = 2,250,000 bytes ≈ 2.15 MB'),
      tip('Higher resolution AND higher colour depth both increase file size. Doubling the resolution quadruples the file size (since both width and height double).')
    )}
    ${section('Image Metadata',
      def('Metadata', 'Data stored alongside the image data that describes properties of the file rather than the image content.'),
      p('Metadata includes: colour depth, resolution (width × height in pixels), date created, author, camera settings, GPS location. Metadata adds to file size but is not part of the visible image.')
    )}
    ${section('Image File Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Format</th><th>Compression</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td>BMP</td><td>None (uncompressed)</td><td>Lossless quality: very large files</td></tr>
          <tr><td>JPEG / JPG</td><td>Lossy</td><td>Photos: small files, some quality loss</td></tr>
          <tr><td>PNG</td><td>Lossless</td><td>Web graphics, transparent backgrounds</td></tr>
          <tr><td>GIF</td><td>Lossless (max 256 colours)</td><td>Simple animations and icons</td></tr>
        </tbody>
      </table></div>`,
      examTip('You must be able to calculate file size. Always show the formula: width × height × colour depth in bits, then convert to bytes (÷8) and then KB (÷1024) or MB.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Pixel','Smallest element of a bitmap image: single colour value.'],
          ['Colour depth','Number of bits per pixel; determines number of possible colours.'],
          ['Resolution','Number of pixels (width × height).'],
          ['Metadata','Data about data: file properties stored alongside image data.'],
          ['RGB','Red, Green, Blue: 8 bits each, 24 bits total per pixel in true colour.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l5': return `
    ${section('Analogue vs Digital Sound',
      p('Sound exists as continuous analogue waves in the real world. Computers store sound as <strong>discrete digital samples</strong>. An <strong>Analogue-to-Digital Converter (ADC)</strong> converts sound to digital data; a <strong>Digital-to-Analogue Converter (DAC)</strong> converts it back for playback.'),
      def('Sampling', 'The process of measuring the amplitude (height) of a sound wave at regular time intervals and recording each measurement as a binary value.')
    )}
    ${section('Sampling Rate and Bit Depth',
      def('Sampling Rate', 'The number of samples taken per second, measured in Hertz (Hz) or kilohertz (kHz). CD quality = 44,100 Hz (44.1 kHz).'),
      def('Bit Depth (Sample Resolution)', 'The number of bits used to record each sample. More bits = more precise amplitude values = better quality. CD quality = 16 bits.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Factor</th><th>Increase causes</th><th>Effect on file size</th></tr></thead>
        <tbody>
          <tr><td>Sampling rate</td><td>More samples per second → better frequency reproduction</td><td>Larger</td></tr>
          <tr><td>Bit depth</td><td>More precise amplitude values → less quantisation noise</td><td>Larger</td></tr>
          <tr><td>Duration</td><td>Longer recording</td><td>Larger</td></tr>
          <tr><td>Channels</td><td>Stereo (2) vs mono (1)</td><td>Larger for stereo</td></tr>
        </tbody>
      </table></div>`,
      tip('Human hearing range: approximately 20 Hz to 20,000 Hz. A sampling rate of at least 40,000 Hz is needed to accurately reproduce this range (Nyquist theorem).')
    )}
    ${section('Sound File Size',
      p('File size (bits) = sampling rate × bit depth × duration (seconds) × channels'),
      p('Example: 1 minute of CD quality stereo audio = 44,100 × 16 × 60 × 2 = 84,672,000 bits ≈ 10.1 MB (uncompressed)'),
      examTip('Know the file size formula and be able to apply it. Questions may give you sampling rate in kHz: remember 44.1 kHz = 44,100 Hz.')
    )}
    ${section('Audio Compression',
      h3('Lossy: MP3'),
      p('MP3 removes sounds in frequency ranges that human hearing is least sensitive to. Permanently deletes data: cannot be restored. Much smaller files but some quality loss.'),
      h3('Lossless'),
      p('Finds repeated patterns and encodes them more efficiently: e.g. "10 identical values" stored as a count + value rather than 10 separate values. File can be perfectly restored to the original.'),
      h3('MIDI'),
      def('MIDI', 'Musical Instrument Digital Interface. Not a recording: a set of instructions telling digital instruments what notes to play, at what tempo, with what instrument. Uses up to 1000× less storage than an audio recording.'),
      tip('MIDI stores <em>instructions</em> (play middle C for 0.5 seconds), not audio samples. This makes it extremely small but requires a synthesiser to play back.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Sampling rate','Samples per second (Hz/kHz): higher = better quality.'],
          ['Bit depth','Bits per sample: higher = more precise amplitude.'],
          ['ADC','Analogue-to-Digital Converter: converts sound to digital.'],
          ['DAC','Digital-to-Analogue Converter: converts digital back to sound.'],
          ['MP3','Lossy compressed audio format.'],
          ['MIDI','Instructions for digital instruments, not a sound recording.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l6': return `
    ${section('Why Compress?',
      p('File compression reduces file size, which means:'),
      `<div class="two-col-list">
        ${[
          ['Faster transmission','Fewer packets → quicker downloads and uploads'],
          ['Less storage','More files fit on a disk or server'],
          ['Lower bandwidth','Especially important for video/audio streaming'],
          ['Reduced costs','Less cloud storage and data transfer charges'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Lossy vs Lossless Compression',
      def('Lossy Compression', 'Permanently removes some data to achieve a smaller file. The original cannot be perfectly restored. Examples: JPEG, MP3, MP4.'),
      def('Lossless Compression', 'Removes redundancy without discarding any data. The original can be perfectly restored on decompression. Examples: PNG, GIF, ZIP, FLAC.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Lossy</th><th>Lossless</th></tr></thead>
        <tbody>
          <tr><td><strong>Data loss</strong></td><td>Yes: permanent</td><td>No</td></tr>
          <tr><td><strong>File size</strong></td><td>Much smaller</td><td>Smaller (less dramatic)</td></tr>
          <tr><td><strong>Restore to original</strong></td><td>No</td><td>Yes</td></tr>
          <tr><td><strong>Common formats</strong></td><td>JPEG, MP3, MP4, GIF</td><td>PNG, TIFF, ZIP, FLAC</td></tr>
          <tr><td><strong>Good for</strong></td><td>Photos, music, video</td><td>Text, medical images, program files</td></tr>
        </tbody>
      </table></div>`,
      examTip('Lossy compression should never be used for computer programs or medical images, losing data could cause errors or wrong diagnoses. Always choose lossless for these.')
    )}
    ${section('Run Length Encoding (RLE)',
      def('Run Length Encoding (RLE)', 'A lossless compression algorithm that replaces repeated consecutive values with a pair: (count, value).'),
      p('Example: A row of pixels <strong>0 0 0 0 0 1 1 1 1 0</strong> becomes <strong>5×0, 4×1, 1×0</strong> → stored as <code>5 0 4 1 1 0</code>: 6 values instead of 10.'),
      tip('RLE is efficient only when there are long runs of identical values: e.g. simple logos and icons. For complex photographic images with many colour changes, RLE may actually <em>increase</em> file size.')
    )}
    ${section('Huffman Coding',
      def('Huffman Coding', 'A lossless compression algorithm that assigns shorter binary codes to more frequently occurring characters, reducing total bit usage.'),
      p('In standard 7-bit ASCII, every character uses exactly 7 bits. Huffman coding analyses the frequency of each character and assigns:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Very short codes (e.g. 1–2 bits) to the most common characters</li>
        <li>Longer codes (e.g. 4–5 bits) to rare characters</li>
      </ul>`,
      p('Example: in "Betty ate butter" the letter T appears most often, so T gets the shortest code (0). The result uses far fewer bits than ASCII.')
    )}
    ${section('Common File Formats',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Format</th><th>Type</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td>PNG</td><td>Lossless</td><td>Web images, transparent backgrounds</td></tr>
          <tr><td>JPEG</td><td>Lossy</td><td>Photos, digital cameras</td></tr>
          <tr><td>GIF</td><td>Lossless (max 256 colours)</td><td>Simple animations, icons</td></tr>
          <tr><td>PDF</td><td>Lossless</td><td>Documents preserving layout</td></tr>
          <tr><td>MP3</td><td>Lossy</td><td>Music files</td></tr>
          <tr><td>MP4</td><td>Lossy</td><td>Video files</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Lossy compression','Permanently removes data: smaller file, lower quality.'],
          ['Lossless compression','No data lost: original can be fully restored.'],
          ['RLE','Run Length Encoding: stores count+value pairs for repeated data.'],
          ['Huffman coding','Assigns shorter codes to more frequent characters.'],
          ['Artefact','Visible quality defect in a lossy-compressed image or video.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}
