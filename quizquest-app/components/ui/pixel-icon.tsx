import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

// Brand Icons
const android = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/android.png');
const angellist = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/angellist.png');
const apple = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/apple.png');
const arweave = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/arweave.png');
const behance = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/behance.png');
const bloomberg = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/bloomberg.png');
const bluesky = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/bluesky.png');
const crunchbase = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/crunchbase.png');
const digg = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/digg.png');
const discord = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/discord.png');
const discourse = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/discourse.png');
const facebookRound = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/facebook-round.png');
const figma = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/figma.png');
const giphy = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/giphy.png');
const github = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/github.png');
const golden = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/golden.png');
const google = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/google.png');
const googleNews = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/google-news.png');
const hackernoon = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/hackernoon.png');
const huggingface = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/huggingface.png');
const imgur = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/imgur.png');
const instagram = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/instagram.png');
const kaggle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/kaggle.png');
const linkedin = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/linkedin.png');
const minds = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/minds.png');
const newsbreak = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/newsbreak.png');
const npm = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/npm.png');
const openAi = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/open-ai.png');
const pinterest = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/pinterest.png');
const podcasts = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/podcasts.png');
const productHunt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/product-hunt.png');
const reddit = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/reddit.png');
const rss = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/rss.png');
const sia = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/sia.png');
const steam = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/steam.png');
const threads = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/threads.png');
const tiktok = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/tiktok.png');
const twitch = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/twitch.png');
const twitter = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/twitter.png');
const unsplash = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/unsplash.png');
const viewblocks = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/viewblocks.png');
const wikipedia = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/wikipedia.png');
const x = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/x.png');
const youtube = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/brands/youtube.png');

// Regular Icons
const ad = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/ad.png');
const alignCenter = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/align-center.png');
const alignJustify = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/align-justify.png');
const alignLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/align-left.png');
const alignRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/align-right.png');
const analytics = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/analytics.png');
const angleDown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/angle-down.png');
const angleLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/angle-left.png');
const angleRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/angle-right.png');
const angleUp = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/angle-up.png');
const arrowAltCircleDown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-alt circle down.png');
const arrowAltCircleLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-alt circle left.png');
const arrowAltCircleRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-alt circle right.png');
const arrowAltCircleUp = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-alt circle up.png');
const arrowCircleDown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-circle down.png');
const arrowCircleLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-circle left.png');
const arrowCircleRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-circle right.png');
const arrowCircleUp = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-circle up.png');
const arrowDown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-down.png');
const arrowLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-left.png');
const arrowRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-right.png');
const arrowUp = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/arrow-up.png');
const at = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/at.png');
const badgeCheck = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/badge-check.png');
const bank = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bank.png');
const bars = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bars.png');
const bell = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bell.png');
const bellExclaimation = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bell-exclaimation.png');
const bellMute = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bell-mute.png');
const bold = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bold.png');
const bolt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bolt.png');
const bookHeart = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/book-heart.png');
const bookmark = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bookmark.png');
const boxUsd = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/box-usd.png');
const brightnessHigh = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/brightness-high.png');
const brightnessLow = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/brightness-low.png');
const bulletList = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bullet-list.png');
const bullhorn = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/bullhorn.png');
const calender = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/calender.png');
const cc = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/cc.png');
const chartLine = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/chart-line.png');
const chartNetwork = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/chart-network.png');
const check = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/check.png');
const checkBox = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/check-box.png');
const checkCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/check-circle.png');
const checkList = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/check-list.png');
const chevronDown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/chevron-down.png');
const chevronUp = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/chevron-up.png');
const circleNotch = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/circle-notch.png');
const clipboard = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/clipboard.png');
const clock = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/clock.png');
const cloudDownload = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/cloud-download.png');
const cloudUpload = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/cloud-upload.png');
const code = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/code.png');
const codeBlock = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/code-block.png');
const cog = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/cog.png');
const comment = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/comment.png');
const commentDots = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/comment-dots.png');
const commentQuote = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/comment-quote.png');
const comments = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/comments.png');
const copy = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/copy.png');
const creditCard = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/credit-card.png');
const crown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/crown.png');
const divider = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/divider.png');
const download = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/download.png');
const downloadAlt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/download-alt.png');
const edit = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/edit.png');
const ellipsesHorizontal = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/ellipses-horizontal.png');
const ellipsesHorizontalCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/ellipses-horizontal circle.png');
const ellipsesVertical = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/ellipses-vertical.png');
const ellipsesVerticalCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/ellipses-vertical circle.png');
const envelope = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/envelope.png');
const exclaimation = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/exclaimation.png');
const exclamationTriangle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/exclamation-triangle.png');
const expand = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/expand.png');
const externalLink = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/external-link.png');
const eye = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/eye.png');
const eyeCross = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/eye-cross.png');
const faceThinking = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/face-thinking.png');
const fileImport = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/file-import.png');
const filter = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/filter.png');
const filterAltCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/filter-alt circle.png');
const fire = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/fire.png');
const flag = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/flag.png');
const flagCheckered = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/flag-checkered.png');
const folder = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/folder.png');
const folderOpen = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/folder-open.png');
const globe = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/globe.png');
const globeAmericas = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/globe-americas.png');
const grid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/grid.png');
const heading2 = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/heading-2.png');
const heading3 = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/heading-3.png');
const heading4 = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/heading-4.png');
const headphones = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/headphones.png');
const heart = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/heart.png');
const highlight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/highlight.png');
const hockeyMask = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/hockey-mask.png');
const home = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/home.png');
const image = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/image.png');
const indent = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/indent.png');
const infoCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/info-circle.png');
const italics = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/italics.png');
const lightbulb = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/lightbulb.png');
const lineHeight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/line-height.png');
const link = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/link.png');
const locationPin = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/location-pin.png');
const lock = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/lock.png');
const lockAlt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/lock-alt.png');
const lockOpen = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/lock-open.png');
const login = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/login.png');
const logout = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/logout.png');
const message = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/message.png');
const messageDots = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/message-dots.png');
const minus = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/minus.png');
const moon = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/moon.png');
const music = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/music.png');
const newspaper = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/newspaper.png');
const numberedList = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/numbered-list.png');
const octagonCheck = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/octagon-check.png');
const octagonTimes = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/octagon-times.png');
const outdent = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/outdent.png');
const pageBreak = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/page-break.png');
const paperclip = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/paperclip.png');
const paragraph = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/paragraph.png');
const pause = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pause.png');
const pen = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pen.png');
const penNib = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pen-nib.png');
const pencil = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pencil.png');
const pencilRuler = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pencil-ruler.png');
const peopleCarry = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/people-carry.png');
const phoneRingingHigh = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/phone-ringing high.png');
const phoneRingingLow = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/phone-ringing low.png');
const plane = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/plane.png');
const planeDeparture = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/plane-departure.png');
const play = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/play.png');
const playlist = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/playlist.png');
const plus = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/plus.png');
const print = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/print.png');
const pro = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/pro.png');
const question = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/question.png');
const quoteLeft = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/quote-left.png');
const quoteRight = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/quote-right.png');
const receipt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/receipt.png');
const refresh = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/refresh.png');
const retroCamera = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/retro-camera.png');
const robot = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/robot.png');
const save = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/save.png');
const search = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/search.png');
const seedlings = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/seedlings.png');
const share = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/share.png');
const shop = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/shop.png');
const shoppingCart = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/shopping-cart.png');
const shuffle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/shuffle.png');
const sort = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/sort.png');
const soundMute = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/sound-mute.png');
const soundOn = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/sound-on.png');
const sparkles = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/sparkles.png');
const spinner = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/spinner.png');
const spinnerThird = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/spinner-third.png');
const star = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/star.png');
const starCrescent = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/star-crescent.png');
const strikeThrough = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/strike-through.png');
const sun = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/sun.png');
const table = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/table.png');
const tag = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/tag.png');
const textSlash = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/text-slash.png');
const themes = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/themes.png');
const thumbsdown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/thumbsdown.png');
const thumbsup = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/thumbsup.png');
const thumbtack = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/thumbtack.png');
const times = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/times.png');
const timesCircle = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/times-circle.png');
const translate = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/translate.png');
const trash = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/trash.png');
const trashAlt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/trash-alt.png');
const trending = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/trending.png');
const trophy = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/trophy.png');
const underline = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/underline.png');
const unlock = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/unlock.png');
const unlockAlt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/unlock-alt.png');
const upload = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/upload.png');
const uploadAlt = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/upload-alt.png');
const user = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/user.png');
const userCheck = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/user-check.png');
const userHeadset = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/user-headset.png');
const users = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/users.png');
const usersCrown = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/users-crown.png');
const voteYeah = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/vote-yeah.png');
const wallet = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/wallet.png');
const windowClose = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/regular/window-close.png');

// Solid Icons
const adSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/ad.png');
const alignCenterSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/align-center.png');
const alignJustifySolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/align-justify.png');
const alignLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/align-left.png');
const alignRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/align-right.png');
const analyticsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/analytics.png');
const angleDownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/angle-down.png');
const angleLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/angle-left.png');
const angleRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/angle-right.png');
const angleUpSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/angle-up.png');
const arrowAltCircleDownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-alt circle down.png');
const arrowAltCircleLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-alt circle left.png');
const arrowAltCircleRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-alt circle right.png');
const arrowAltCircleUpSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-alt circle up.png');
const arrowCircleDownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-circle down.png');
const arrowCircleLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-circle left.png');
const arrowCircleRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-circle right.png');
const arrowCircleUpSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-circle up.png');
const arrowDownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-down.png');
const arrowLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-left.png');
const arrowRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-right.png');
const arrowUpSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/arrow-up.png');
const atSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/at.png');
const badgeCheckSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/badge-check.png');
const bankSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bank.png');
const barsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bars.png');
const bellSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bell.png');
const bellExclaimationSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bell-exclaimation.png');
const bellMuteSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bell-mute.png');
const boldSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bold.png');
const boltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bolt.png');
const bookHeartSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/book-heart.png');
const bookmarkSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bookmark.png');
const boxUsdSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/box-usd.png');
const brightnessHighSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/brightness-high.png');
const brightnessLowSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/brightness-low.png');
const bulletListSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bullet-list.png');
const bullhornSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/bullhorn.png');
const calenderSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/calender.png');
const ccSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/cc.png');
const chartLineSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/chart-line.png');
const chartNetworkSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/chart-network.png');
const checkSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/check.png');
const checkBoxSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/check-box.png');
const checkCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/check-circle.png');
const checkListSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/check-list.png');
const chevronDownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/chevron-down.png');
const chevronUpSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/chevron-up.png');
const circleNotchSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/circle-notch.png');
const clipboardSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/clipboard.png');
const clockSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/clock.png');
const cloudDownloadSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/cloud-download.png');
const cloudUploadSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/cloud-upload.png');
const codeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/code.png');
const codeBlockSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/code-block.png');
const cogSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/cog.png');
const commentSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/comment.png');
const commentDotsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/comment-dots.png');
const commentQuoteSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/comment-quote.png');
const commentsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/comments.png');
const copySolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/copy.png');
const creditCardSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/credit-card.png');
const crownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/crown.png');
const dividerSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/divider.png');
const downloadSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/download.png');
const downloadAltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/download-alt.png');
const editSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/edit.png');
const ellipsesHorizontalSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/ellipses-horizontal.png');
const ellipsesHorizontalCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/ellipses-horizontal circle.png');
const ellipsesVerticalSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/ellipses-vertical.png');
const ellipsesVerticalCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/ellipses-vertical circle.png');
const envelopeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/envelope.png');
const exclaimationSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/exclaimation.png');
const exclamationTriangleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/exclamation-triangle.png');
const expandSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/expand.png');
const externalLinkSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/external-link.png');
const eyeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/eye.png');
const eyeCrossSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/eye-cross.png');
const faceThinkingSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/face-thinking.png');
const fileImportSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/file-import.png');
const filterSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/filter.png');
const filterAltCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/filter-alt circle.png');
const fireSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/fire.png');
const flagSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/flag.png');
const flagCheckeredSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/flag-checkered.png');
const folderSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/folder.png');
const folderOpenSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/folder-open.png');
const globeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/globe.png');
const globeAmericasSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/globe-americas.png');
const gridSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/grid.png');
const heading1Solid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/heading-1.png');
const heading2Solid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/heading-2.png');
const heading3Solid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/heading-3.png');
const headphonesSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/headphones.png');
const heartSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/heart.png');
const highlightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/highlight.png');
const hockeyMaskSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/hockey-mask.png');
const homeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/home.png');
const imageSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/image.png');
const indentSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/indent.png');
const infoCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/info-circle.png');
const italicsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/italics.png');
const lightbulbSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/lightbulb.png');
const lineHeightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/line-height.png');
const linkSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/link.png');
const locationPinSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/location-pin.png');
const lockSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/lock.png');
const lockAltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/lock-alt.png');
const lockOpenSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/lock-open.png');
const loginSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/login.png');
const logoutSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/logout.png');
const messageSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/message.png');
const messageDotsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/message-dots.png');
const minusSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/minus.png');
const moonSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/moon.png');
const musicSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/music.png');
const newspaperSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/newspaper.png');
const numberedListSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/numbered-list.png');
const octagonCheckSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/octagon-check.png');
const octagonTimesSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/octagon-times.png');
const outdentSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/outdent.png');
const pageBreakSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/page-break.png');
const paperclipSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/paperclip.png');
const paragraphSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/paragraph.png');
const pauseSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pause.png');
const penSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pen.png');
const penNibSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pen-nib.png');
const pencilSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pencil.png');
const pencilRulerSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pencil-ruler.png');
const peopleCarrySolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/people-carry.png');
const phoneRingingHighSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/phone-ringing high.png');
const phoneRingingLowSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/phone-ringing low.png');
const planeSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/plane.png');
const planeDepartureSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/plane-departure.png');
const playSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/play.png');
const playlistSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/playlist.png');
const plusSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/plus.png');
const printSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/print.png');
const proSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/pro.png');
const questionSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/question.png');
const quoteLeftSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/quote-left.png');
const quoteRightSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/quote-right.png');
const receiptSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/receipt.png');
const refreshSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/refresh.png');
const retroCameraSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/retro-camera.png');
const robotSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/robot.png');
const saveSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/save.png');
const searchSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/search.png');
const seedlingsSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/seedlings.png');
const shareSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/share.png');
const shopSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/shop.png');
const shoppingCartSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/shopping-cart.png');
const shuffleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/shuffle.png');
const sortSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/sort.png');
const soundMuteSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/sound-mute.png');
const soundOnSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/sound-on.png');
const sparklesSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/sparkles.png');
const spinnerSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/spinner.png');
const spinnerThirdSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/spinner-third.png');
const starSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/star.png');
const starCrescentSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/star-crescent.png');
const strikeThroughSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/strike-through.png');
const sunSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/sun.png');
const tableSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/table.png');
const tagSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/tag.png');
const textSlashSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/text-slash.png');
const themesSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/themes.png');
const thumbsdownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/thumbsdown.png');
const thumbsupSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/thumbsup.png');
const thumbtackSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/thumbtack.png');
const timesSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/times.png');
const timesCircleSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/times-circle.png');
const translateSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/translate.png');
const trashSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/trash.png');
const trashAltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/trash-alt.png');
const trendingSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/trending.png');
const trophySolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/trophy.png');
const underlineSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/underline.png');
const unlockSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/unlock.png');
const unlockAltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/unlock-alt.png');
const uploadSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/upload.png');
const uploadAltSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/upload-alt.png');
const userSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/user.png');
const userCheckSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/user-check.png');
const userHeadsetSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/user-headset.png');
const usersSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/users.png');
const usersCrownSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/users-crown.png');
const voteYeahSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/vote-yeah.png');
const walletSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/wallet.png');
const windowCloseSolid = require('@hackernoon/pixel-icon-library/icons/PNG/for-light-mode/48px/solid/window-close.png');

const icons: Record<string, any> = {
  // Brand Icons
  android,
  angellist,
  apple,
  arweave,
  behance,
  bloomberg,
  bluesky,
  crunchbase,
  digg,
  discord,
  discourse,
  facebookRound,
  figma,
  giphy,
  github,
  golden,
  google,
  googleNews,
  hackernoon,
  huggingface,
  imgur,
  instagram,
  kaggle,
  linkedin,
  minds,
  newsbreak,
  npm,
  openAi,
  pinterest,
  podcasts,
  productHunt,
  reddit,
  rss,
  sia,
  steam,
  threads,
  tiktok,
  twitch,
  twitter,
  unsplash,
  viewblocks,
  wikipedia,
  x,
  youtube,

  // Regular Icons
  ad,
  alignCenter,
  alignJustify,
  alignLeft,
  alignRight,
  analytics,
  angleDown,
  angleLeft,
  angleRight,
  angleUp,
  arrowAltCircleDown,
  arrowAltCircleLeft,
  arrowAltCircleRight,
  arrowAltCircleUp,
  arrowCircleDown,
  arrowCircleLeft,
  arrowCircleRight,
  arrowCircleUp,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  at,
  badgeCheck,
  bank,
  bars,
  bell,
  bellExclaimation,
  bellMute,
  bold,
  bolt,
  bookHeart,
  bookmark,
  boxUsd,
  brightnessHigh,
  brightnessLow,
  bulletList,
  bullhorn,
  calender,
  cc,
  chartLine,
  chartNetwork,
  check,
  checkBox,
  checkCircle,
  checkList,
  chevronDown,
  chevronUp,
  circleNotch,
  clipboard,
  clock,
  cloudDownload,
  cloudUpload,
  code,
  codeBlock,
  cog,
  comment,
  commentDots,
  commentQuote,
  comments,
  copy,
  creditCard,
  crown,
  divider,
  download,
  downloadAlt,
  edit,
  ellipsesHorizontal,
  ellipsesHorizontalCircle,
  ellipsesVertical,
  ellipsesVerticalCircle,
  envelope,
  exclaimation,
  exclamationTriangle,
  expand,
  externalLink,
  eye,
  eyeCross,
  faceThinking,
  fileImport,
  filter,
  filterAltCircle,
  fire,
  flag,
  flagCheckered,
  folder,
  folderOpen,
  globe,
  globeAmericas,
  grid,
  heading2,
  heading3,
  heading4,
  headphones,
  heart,
  highlight,
  hockeyMask,
  home,
  image,
  indent,
  infoCircle,
  italics,
  lightbulb,
  lineHeight,
  link,
  locationPin,
  lock,
  lockAlt,
  lockOpen,
  login,
  logout,
  message,
  messageDots,
  minus,
  moon,
  music,
  newspaper,
  numberedList,
  octagonCheck,
  octagonTimes,
  outdent,
  pageBreak,
  paperclip,
  paragraph,
  pause,
  pen,
  penNib,
  pencil,
  pencilRuler,
  peopleCarry,
  phoneRingingHigh,
  phoneRingingLow,
  plane,
  planeDeparture,
  play,
  playlist,
  plus,
  print,
  pro,
  question,
  quoteLeft,
  quoteRight,
  receipt,
  refresh,
  retroCamera,
  robot,
  save,
  search,
  seedlings,
  share,
  shop,
  shoppingCart,
  shuffle,
  sort,
  soundMute,
  soundOn,
  sparkles,
  spinner,
  spinnerThird,
  star,
  starCrescent,
  strikeThrough,
  sun,
  table,
  tag,
  textSlash,
  themes,
  thumbsdown,
  thumbsup,
  thumbtack,
  times,
  timesCircle,
  translate,
  trash,
  trashAlt,
  trending,
  trophy,
  underline,
  unlock,
  unlockAlt,
  upload,
  uploadAlt,
  user,
  userCheck,
  userHeadset,
  users,
  usersCrown,
  voteYeah,
  wallet,
  windowClose,

  // Solid Icons
  adSolid,
  alignCenterSolid,
  alignJustifySolid,
  alignLeftSolid,
  alignRightSolid,
  analyticsSolid,
  angleDownSolid,
  angleLeftSolid,
  angleRightSolid,
  angleUpSolid,
  arrowAltCircleDownSolid,
  arrowAltCircleLeftSolid,
  arrowAltCircleRightSolid,
  arrowAltCircleUpSolid,
  arrowCircleDownSolid,
  arrowCircleLeftSolid,
  arrowCircleRightSolid,
  arrowCircleUpSolid,
  arrowDownSolid,
  arrowLeftSolid,
  arrowRightSolid,
  arrowUpSolid,
  atSolid,
  badgeCheckSolid,
  bankSolid,
  barsSolid,
  bellSolid,
  bellExclaimationSolid,
  bellMuteSolid,
  boldSolid,
  boltSolid,
  bookHeartSolid,
  bookmarkSolid,
  boxUsdSolid,
  brightnessHighSolid,
  brightnessLowSolid,
  bulletListSolid,
  bullhornSolid,
  calenderSolid,
  ccSolid,
  chartLineSolid,
  chartNetworkSolid,
  checkSolid,
  checkBoxSolid,
  checkCircleSolid,
  checkListSolid,
  chevronDownSolid,
  chevronUpSolid,
  circleNotchSolid,
  clipboardSolid,
  clockSolid,
  cloudDownloadSolid,
  cloudUploadSolid,
  codeSolid,
  codeBlockSolid,
  cogSolid,
  commentSolid,
  commentDotsSolid,
  commentQuoteSolid,
  commentsSolid,
  copySolid,
  creditCardSolid,
  crownSolid,
  dividerSolid,
  downloadSolid,
  downloadAltSolid,
  editSolid,
  ellipsesHorizontalSolid,
  ellipsesHorizontalCircleSolid,
  ellipsesVerticalSolid,
  ellipsesVerticalCircleSolid,
  envelopeSolid,
  exclaimationSolid,
  exclamationTriangleSolid,
  expandSolid,
  externalLinkSolid,
  eyeSolid,
  eyeCrossSolid,
  faceThinkingSolid,
  fileImportSolid,
  filterSolid,
  filterAltCircleSolid,
  fireSolid,
  flagSolid,
  flagCheckeredSolid,
  folderSolid,
  folderOpenSolid,
  globeSolid,
  globeAmericasSolid,
  gridSolid,
  heading1Solid,
  heading2Solid,
  heading3Solid,
  headphonesSolid,
  heartSolid,
  highlightSolid,
  hockeyMaskSolid,
  homeSolid,
  imageSolid,
  indentSolid,
  infoCircleSolid,
  italicsSolid,
  lightbulbSolid,
  lineHeightSolid,
  linkSolid,
  locationPinSolid,
  lockSolid,
  lockAltSolid,
  lockOpenSolid,
  loginSolid,
  logoutSolid,
  messageSolid,
  messageDotsSolid,
  minusSolid,
  moonSolid,
  musicSolid,
  newspaperSolid,
  numberedListSolid,
  octagonCheckSolid,
  octagonTimesSolid,
  outdentSolid,
  pageBreakSolid,
  paperclipSolid,
  paragraphSolid,
  pauseSolid,
  penSolid,
  penNibSolid,
  pencilSolid,
  pencilRulerSolid,
  peopleCarrySolid,
  phoneRingingHighSolid,
  phoneRingingLowSolid,
  planeSolid,
  planeDepartureSolid,
  playSolid,
  playlistSolid,
  plusSolid,
  printSolid,
  proSolid,
  questionSolid,
  quoteLeftSolid,
  quoteRightSolid,
  receiptSolid,
  refreshSolid,
  retroCameraSolid,
  robotSolid,
  saveSolid,
  searchSolid,
  seedlingsSolid,
  shareSolid,
  shopSolid,
  shoppingCartSolid,
  shuffleSolid,
  sortSolid,
  soundMuteSolid,
  soundOnSolid,
  sparklesSolid,
  spinnerSolid,
  spinnerThirdSolid,
  starSolid,
  starCrescentSolid,
  strikeThroughSolid,
  sunSolid,
  tableSolid,
  tagSolid,
  textSlashSolid,
  themesSolid,
  thumbsdownSolid,
  thumbsupSolid,
  thumbtackSolid,
  timesSolid,
  timesCircleSolid,
  translateSolid,
  trashSolid,
  trashAltSolid,
  trendingSolid,
  trophySolid,
  underlineSolid,
  unlockSolid,
  unlockAltSolid,
  uploadSolid,
  uploadAltSolid,
  userSolid,
  userCheckSolid,
  userHeadsetSolid,
  usersSolid,
  usersCrownSolid,
  voteYeahSolid,
  walletSolid,
  windowCloseSolid,
};

export interface PixelIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

/**
 * Simple pixel icon component
 */
export function PixelIcon({ name, size = 24, color = '#ffffff', style }: PixelIconProps) {
  const iconSource = icons[name] || heart;

  return (
    <Image
      source={iconSource}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
}

// Export for testing
export { icons };
