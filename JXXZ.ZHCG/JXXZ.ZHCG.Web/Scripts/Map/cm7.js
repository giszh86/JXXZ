function WJH$(e) {
    return document.getElementById(e);
}

/************************************************************************/
/* 产生随机数
/************************************************************************/
__rnd.today = new Date();
__rnd.seed = __rnd.today.getTime();
function __rnd() {
    __rnd.seed = (__rnd.seed * 9301 + 49297) % 233280;
    return __rnd.seed / (233280.0);
};
function getRand(number) {
    return Math.ceil(__rnd() * number);
};

function getRandColor() {
    var r = getRand(255);
    var b = getRand(255);
    var g = getRand(255);
    var signedColor = 255 << 24 | r << 16 | g << 8 | b;
    var unsginedColor = signedColor >>> 0;  // 通过右移转成无符号整数
    return unsginedColor;
}

/************************************************************************/
/* 构造ARGB颜色值
/************************************************************************/
function colorFromARGB(a, r, g, b) {
    return (a << 24 | r << 16 | g << 8 | b) >>> 0;  // 通过右移转成无符号整数
}


/************************************************************************/
/* 异常处理
/************************************************************************/
function exceptionHandler(e) {
    var msg = (typeof e == "object") ? e.message : e;
    alert(msg);

    //如果需要自定义异常描述信息
    //如果是IE浏览器，可以直接用e中取出错误码：var code = e.number;
    var code = parseInt(msg.substring(msg.indexOf("[") + 1, msg.length - 1));
    if (code == -2147220504) {
        alert("此类型的数据源不支持此操作!");
    }
}


/***********************************************/
/*GviFdeCommon
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviLanguage = {
    gviLanguageChineseSimple: 0,
    gviLanguageChineseTraditional: 1,
    gviLanguageEnglish: 2
};


/***********************************************/
/*GviFdeCore
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviFieldType = {
    gviFieldUnknown: 0,
    gviFieldInt16: 2,
    gviFieldInt32: 3,
    gviFieldInt64: 4,
    gviFieldFloat: 5,
    gviFieldDouble: 6,
    gviFieldString: 7,
    gviFieldDate: 8,
    gviFieldBlob: 9,
    gviFieldFID: 10,
    gviFieldUUID: 11,
    gviFieldGeometry: 99
};

/*!
 * 对该枚举的说明
 */
gviDomainType = {
    gviDomainRange: 0,
    gviDomainCodedValue: 1
};

/*!
 * 对该枚举的说明
 */
gviGeometryColumnType = {
    gviGeometryColumnPoint: 0,
    gviGeometryColumnModelPoint: 1,
    gviGeometryColumnMultiPoint: 3,
    gviGeometryColumnPolyline: 4,
    gviGeometryColumnPolygon: 5,
    gviGeometryColumnTriMesh: 7,
    gviGeometryColumnPointCloud: 8,
    gviGeometryColumnCollection: 9,
    gviGeometryColumnUnknown: -1
};

/*!
 * 对该枚举的说明
 */
gviIndexType = {
    gviIndexRdbms: 0,
    gviIndexGrid: 3,
    gviIndexRender: 4
};

/*!
 * 对该枚举的说明
 */
gviDataSetType = {
    gviDataSetAny: 0,
    gviDataSetDbmsTable: 1,
    gviDataSetObjectClassTable: 2,
    gviDataSetFeatureClassTable: 3
};

/*!
 * 对该枚举的说明
 */
gviFilterType = {
    gviFilterAttributeOnly: 1,
    gviFilterWithSpatial: 2,
    gviFilterWithTemporal: 3
};

/*!
 * 对该枚举的说明
 */
gviConnectionType = {
    gviConnectionUnknown: 0,
    gviConnectionMySql5x: 2,
    gviConnectionFireBird2x: 3,
    gviConnectionOCI11: 4,
    gviConnectionMSClient: 6,
    gviConnectionSQLite3: 10,
    gviConnectionShapeFile: 12,
    gviConnectionArcGISServer10: 13,
    gviConnectionArcSDE9x: 14,
    gviConnectionArcSDE10x: 15,
    gviConnectionWFS: 16,
    gviConnectionCms7Http: 101,
    gviConnectionCms7Https: 102,
    gviConnectionPlugin: 999
};

/*!
 * 对该枚举的说明
 */
gviLockType = {
    gviLockSharedSchemaReadonly: 0,
    gviLockSharedSchema: 1,
    gviLockExclusiveSchema: 2
};

/*!
 * 对该枚举的说明
 */
gviSpatialRel = {
    gviSpatialRelEnvelope: 0,
    gviSpatialRelEquals: 1,
    gviSpatialRelIntersects: 2,
    gviSpatialRelTouches: 3,
    gviSpatialRelCrosses: 4,
    gviSpatialRelWithin: 5,
    gviSpatialRelContains: 6,
    gviSpatialRelOverlaps: 7
};

/*!
 * 对该枚举的说明
 */
gviRenderIndexRebuildType = {
    gviRenderIndexRebuildFlagOnly: 1,
    gviRenderIndexRebuildWithData: 2
};

/*!
 * 对该枚举的说明
 */
gviFdbCapability = {
    gviFdbCapReplicationCheckOutMaster: 1,
    gviFdbCapQueryResultIndexRange: 2,
    gviFdbCapModifyField: 3,
    gviFdbCapAddField: 4,
    gviFdbCapDeleteField: 5,
    gviFdbCapModifyData: 20
};

/*!
 * 对该枚举的说明
 */
gviResultStoreLocation = {
    gviResultStoreLocationServer: 0,
    gviResultStoreLocationClient: 1
};

/*!
 * 对该枚举的说明
 */
gviReplicateOperation = {
    gviReplicateInitialize: 0,
    gviReplicateFinished: 1,
    gviReplicateExtractSchema: 2,
    gviReplicateExtractData: 4,
    gviReplicateCreateSchema: 8,
    gviReplicateReplicateData: 16,
    gviReplicateCreateSpatialIndex: 32,
    gviReplicateCreateRenderIndex: 64,
    gviReplicateCommitTransaction: 128,
    gviReplicateTruncateDelta: 256,
    gviReplicateReleaseLock: 512,
    gviCloseFile: 1024,
    gviWriteFile: 2048,
    gviOpenFile: 4096,
    gviWriteImage: 8192,
    gviWriteModel: 16384
};

/*!
 * 对该枚举的说明
 */
gviConflictDetectedType = {
    gviConflictDetectedMaster: 1,
    gviConflictDetectedSlave: 2,
    gviConflictDetectedManual: 3
};

/*!
 * 对该枚举的说明
 */
gviReplicationType = {
    gviReplicationCheckOut: 0,
    gviReplicationCheckIn: 1
};

/*!
 * 对该枚举的说明
 */
gviModelType = {
    gviSimpleModel: 0,
    gviFineModel: 1
};


/***********************************************/
/*GviFdeDataInterop
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviDataConnectionType = {
    gviOgrConnectionUnknown: 0,
    gviOgrConnectionDWG: 1,
    gviOgrConnectionShp: -2147483647,
    gviOgrConnectionSDE: -2147483646,
    gviOgrConnectionOCI: -2147483645,
    gviOgrConnectionMS: -2147483644,
    gviOgrConnectionPG: -2147483643,
    gviOgrConnectionPGEO: -2147483642,
    gviOgrConnectionWFS: -2147483641,
    gviOGRConnectionFileGDB: -2147483640,
    gviOGRConnectionSKP: -2147483639,
    gviOGRConnectionLAS: -2147483632,
    gviOGRConnectionFBX: -2147483631
};

/*!
 * 对该枚举的说明
 */
gviResourceConflictPolicy = {
    gviResourceIgnore: 1,
    gviResourceUserExists: 2,
    gviResourceOverWrite: 3,
    gviResourceRenameToNew: 4
};

/*!
 * 对该枚举的说明
 */
gviDomainCopyPolicy = {
    gviDomainIgnor: 1,
    gviDomainCopy: 2
};

/*!
 * 对该枚举的说明
 */
gviRebuildRenderIndexPolicy = {
    gviRebuildNone: 1,
    gviRebuildOnlyFlag: 2,
    gviRebuildWithData: 3
};


/***********************************************/
/*GviFdeGeometry
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviGeometryType = {
    gviGeometryUnknown: 0,
    gviGeometryPoint: 1,
    gviGeometryModelPoint: 2,
    gviGeometryCircularArc: 6,
    gviGeometryLine: 10,
    gviGeometryCircle: 11,
    gviGeometryPolyline: 30,
    gviGeometryRing: 31,
    gviGeometryCompoundLine: 32,
    gviGeometryPolygon: 50,
    gviGeometryTriMesh: 51,
    gviGeometryCollection: 70,
    gviGeometryMultiPoint: 71,
    gviGeometryMultiPolyline: 72,
    gviGeometryMultiPolygon: 73,
    gviGeometryMultiTrimesh: 74,
    gviGeometryClosedTriMesh: 77
};

/*!
 * 对该枚举的说明
 */
gviGeometryDimension = {
    gviGeometry0Dimension: 0,
    gviGeometry1Dimension: 1,
    gviGeometry2Dimension: 2,
    gviGeometry3Dimension: 3,
    gviGeometryNoDimension: -1
};

/*!
 * 对该枚举的说明
 */
gviVertexAttribute = {
    gviVertexAttributeNone: 0,
    gviVertexAttributeZ: 1,
    gviVertexAttributeM: 2,
    gviVertexAttributeZM: 3,
    gviVertexAttributeID: 4,
    gviVertexAttributeZID: 5,
    gviVertexAttributeMID: 6,
    gviVertexAttributeZMID: 7
};

/*!
 * 对该枚举的说明
 */
gviCoordinateReferenceSystemType = {
    gviCrsProject: 1,
    gviCrsGeographic: 2,
    gviCrsVertical: 3,
    gviCrsTemporal: 4,
    gviCrsUnknown: 5
};

/*!
 * 对该枚举的说明
 */
gviCurveInterpolationType = {
    gviCurveInterpolationLinear: 0,
    gviCurveInterpolationCircle: 1
};

/*!
 * 对该枚举的说明
 */
gviLocateStatus = {
    gviLocateOutside: 0,
    gviLocateVertex: 1,
    gviLocateEdge: 2,
    gviLocateFacet: 3
};

/*!
 * 对该枚举的说明
 */
gviSurfaceInterpolationType = {
    gviSurfaceInterpolationPlanar: 0,
    gviSurfaceInterpolationSpherical: 1,
    gviSurfaceInterpolationElliptical: 2,
    gviSurfaceInterpolationParametricCurve: 3
};

/*!
 * 对该枚举的说明
 */
gviTerrainAnalyseOperation = {
    gviTerrainGetSurfaceArea: 0,
    gviTerrainFindWaterSinkBoundary: 1,
    gviTerrainCalculateCutFill: 2
};

/*!
 * 对该枚举的说明
 */
gviBufferStyle = {
    gviBufferCapround: 1,
    gviBufferCapbutt: 2,
    gviBufferCapsquare: 3
};

/*!
 * 对该枚举的说明
 */
gviRoofType = {
    gviRoofFlat: 0,
    gviRoofHip: 1,
    gviRoofGable: 2
};


/***********************************************/
/*GviFdeUndoRedo
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviCommandType = {
    gviCommandStart: 0,
    gviCommandInsert: 1,
    gviCommandDelete: 2,
    gviCommandUpdate: 3
};


/***********************************************/
/*GviMath
/***********************************************/



/***********************************************/
/*GviRenderControl
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviRenderSystem = {
    gviRenderD3D: 0,
    gviRenderOpenGL: 1
};

/*!
 * 对该枚举的说明
 */
gviObjectType = {
    gviObjectNone: 0,
    gviObjectReferencePlane: 2,
    gviObjectGroup: 4,
    gviObjectFeatureLayer: 256,
    gviObjectTerrain: 257,
    gviObjectRenderModelPoint: 258,
    gviObjectTerrainRoute: 260,
    gviObjectRenderPolyline: 261,
    gviObjectRenderPolygon: 262,
    gviObjectRenderTriMesh: 263,
    gviObjectRenderMultiPoint: 264,
    gviObjectRenderPoint: 265,
    gviObjectCameraTour: 266,
    gviObjectMotionPath: 267,
    gviObjectSkyBox: 271,
    gviObjectParticleEffect: 272,
    gviObjectLabel: 273,
    gviObjectTableLabel: 274,
    gviObjectSkinnedMesh: 275,
    gviObjectRenderArrow: 276,
    gviObjectRenderMultiPolyline: 277,
    gviObjectRenderMultiPolygon: 278,
    gviObjectImageryLayer: 279,
    gviObjectRenderMultiTriMesh: 280,
    gviObjectTerrainHole: 281,
    gviObjectTerrainVideo: 283,
    gviObjectOverlayLabel: 284
};

/*!
 * 对该枚举的说明
 */
gviMeasurementMode = {
    gviMeasureAerialDistance: 0,
    gviMeasureHorizontalDistance: 1,
    gviMeasureVerticalDistance: 2,
    gviMeasureCoordinate: 3,
    gviMeasureGroundDistance: 4,
    gviMeasureArea: 5,
    gviMeasureGroundArea: 6,
    gviMeasureGroupSightLine: 7
};

/*!
 * 对该枚举的说明
 */
gviInteractMode = {
    gviInteractNormal: 1,
    gviInteractSelect: 2,
    gviInteractMeasurement: 3,
    gviInteractEdit: 4,
    gviInteractWalk: 5,
    gviInteractDisable: 6,
    gviInteract2DMap: 7
};

/*!
 * 对该枚举的说明
 */
gviEditorType = {
    gviEditorNone: 0,
    gviEditorMove: 1,
    gviEditorRotate: 2,
    gviEditorScale: 3,
    gviEditorZRotate: 4,
    gviEditorZScale: 5,
    gviEditorZMove: 6,
    gviEditorXYMove: 7
};

/*!
 * 对该枚举的说明
 */
gviMouseSelectObjectMask = {
    gviSelectNone: 0,
    gviSelectFeatureLayer: 1,
    gviSelectTerrain: 2,
    gviSelectReferencePlane: 8,
    gviSelectTerrainHole: 16,
    gviSelectLable: 64,
    gviSelectParticleEffect: 128,
    gviSelectRenderGeometry: 256,
    gviSelectSkinnedMesh: 512,
    gviSelectAll: 65535
};

/*!
 * 对该枚举的说明
 */
gviMouseSelectMode = {
    gviMouseSelectClick: 1,
    gviMouseSelectDrag: 2,
    gviMouseSelectMove: 4,
    gviMouseSelectHover: 8
};

/*!
 * 对该枚举的说明
 */
gviSetCameraFlags = {
    gviSetCameraNoFlags: 0,
    gviSetCameraIgnoreX: 1,
    gviSetCameraIgnoreY: 2,
    gviSetCameraIgnoreZ: 4,
    gviSetCameraIgnorePosition: 7,
    gviSetCameraIgnoreYaw: 8,
    gviSetCameraIgnorePitch: 16,
    gviSetCameraIgnoreRoll: 32,
    gviSetCameraIgnoreOrientation: 56
};

/*!
 * 对该枚举的说明
 */
gviGetElevationType = {
    gviGetElevationFromDatabase: 0,
    gviGetElevationFromMemory: 1
};

/*!
 * 对该枚举的说明
 */
gviPivotAlignment = {
    gviPivotAlignBottomLeft: 0,
    gviPivotAlignBottomCenter: 1,
    gviPivotAlignBottomRight: 2,
    gviPivotAlignCenterLeft: 3,
    gviPivotAlignCenterCenter: 4,
    gviPivotAlignCenterRight: 5,
    gviPivotAlignTopLeft: 6,
    gviPivotAlignTopCenter: 7,
    gviPivotAlignTopRight: 8
};

/*!
 * 对该枚举的说明
 */
gviMultilineJustification = {
    gviMultilineLeft: 0,
    gviMultilineCenter: 1,
    gviMultilineRight: 2
};

/*!
 * 对该枚举的说明
 */
gviCameraTourMode = {
    gviCameraTourLinear: 0,
    gviCameraTourSmooth: 1,
    gviCameraTourBounce: 2
};

/*!
 * 对该枚举的说明
 */
gviSimplePointStyle = {
    gviSimplePointCircle: 0,
    gviSimplePointSquare: 1,
    gviSimplePointCross: 2,
    gviSimplePointX: 3,
    gviSimplePointDiamond: 4
};

/*!
 * 对该枚举的说明
 */
gviViewportMode = {
    gviViewportSinglePerspective: 1,
    gviViewportStereoAnaglyph: 2,
    gviViewportStereoQuadbuffer: 3,
    gviViewportL1R1: 4,
    gviViewportT1B1: 6,
    gviViewportL1M1R1: 7,
    gviViewportT1M1B1: 8,
    gviViewportL2R1: 9,
    gviViewportL1R2: 10,
    gviViewportQuad: 11,
    gviViewportPIP: 12,
    gviViewportQuadH: 13,
    gviViewportStereoDualView: 14
};

/*!
 * 对该枚举的说明
 */
gviSkyboxImageIndex = {
    gviSkyboxImageFront: 0,
    gviSkyboxImageBack: 1,
    gviSkyboxImageLeft: 2,
    gviSkyboxImageRight: 3,
    gviSkyboxImageTop: 4,
    gviSkyboxImageBottom: 5
};

/*!
 * 对该枚举的说明
 */
gviGeoEditType = {
    gviGeoEditCreator: 0,
    gviGeoEdit3DMove: 1,
    gviGeoEdit3DRotate: 2,
    gviGeoEdit3DScale: 3,
    gviGeoEdit2DMove: 4,
    gviGeoEditZRotate: 5,
    gviGeoEditZScale: 6,
    gviGeoEditVertex: 7
};

/*!
 * 对该枚举的说明
 */
gviParticleBillboardType = {
    gviParticleBillboardOrientedCamera: 0,
    gviParticleBillboardOrientedMoveDirection: 1
};

/*!
 * 对该枚举的说明
 */
gviWeatherType = {
    gviWeatherSunShine: 0,
    gviWeatherLightRain: 1,
    gviWeatherModerateRain: 2,
    gviWeatherHeavyRain: 3,
    gviWeatherLightSnow: 4,
    gviWeatherModerateSnow: 5,
    gviWeatherHeavySnow: 6
};

/*!
 * 对该枚举的说明
 */
gviModKeyMask = {
    gviModKeyShift: 3,
    gviModKeyCtrl: 12,
    gviModKeyDblClk: 16384
};

/*!
 * 对该枚举的说明
 */
gviViewportMask = {
    gviViewNone: 0,
    gviView0: 1,
    gviView1: 2,
    gviView2: 4,
    gviView3: 8,
    gviViewAllNormalView: 15,
    gviViewPIP: 16
};

/*!
 * 对该枚举的说明
 */
gviRenderRuleType = {
    gviRenderRuleRange: 0,
    gviRenderRuleUniqueValues: 1
};

/*!
 * 对该枚举的说明
 */
gviHeightStyle = {
    gviHeightOnTerrain: 0,
    gviHeightAbsolute: 1,
    gviHeightRelative: 2
};

/*!
 * 对该枚举的说明
 */
gviFogMode = {
    gviFogNone: 0,
    gviFogExp: 1,
    gviFogExp2: 2,
    gviFogLinear: 3
};

/*!
 * 对该枚举的说明
 */
gviRenderType = {
    gviRenderSimple: 0,
    gviRenderValueMap: 1
};

/*!
 * 对该枚举的说明
 */
gviRasterSourceType = {
    gviRasterSourceFile: 0,
    gviRasterSourceGeoRaster: 1,
    gviRasterSourceWMS: 2,
    gviRasterSourceWMTS: 3
};

/*!
 * 对该枚举的说明
 */
gviGeometrySymbolType = {
    gviGeoSymbolPoint: 0,
    gviGeoSymbolImagePoint: 1,
    gviGeoSymbolModelPoint: 2,
    gviGeoSymbolCurve: 3,
    gviGeoSymbolSurface: 4,
    gviGeoSymbol3DPolygon: 5,
    gviGeoSymbolSolid: 6
};

/*!
 * 对该枚举的说明
 */
gviFlyMode = {
    gviFlyArc: 0,
    gviFlyLinear: 1
};

/*!
 * 对该枚举的说明
 */
gviActionCode = {
    gviActionFlyTo: 0,
    gviActionJump: 1,
    gviActionFollowBehind: 2,
    gviActionFollowAbove: 3,
    gviActionFollowBelow: 4,
    gviActionFollowLeft: 5,
    gviActionFollowRight: 6,
    gviActionFollowBehindAndAbove: 7,
    gviActionFollowCockpit: 8
};

/*!
 * 对该枚举的说明
 */
gviHTMLWindowPosition = {
    gviWinPosUserDefined: 0,
    gviWinPosCenterParent: 1,
    gviWinPosCenterDesktop: 2,
    gviWinPosMousePosition: 3,
    gviWinPosParentSize: 4,
    gviWinPosParentRightTop: 5
};

/*!
 * 对该枚举的说明
 */
gviSunCalculateMode = {
    gviSunModeFollowCamera: 1,
    gviSunModeAccordingToGMT: 2,
    gviSunModeUserDefined: 3
};

/*!
 * 对该枚举的说明
 */
gviMouseSnapMode = {
    gviMouseSnapDisable: 0,
    gviMouseSnapVertex: 1
};

/*!
 * 对该枚举的说明
 */
gviArrowType = {
    gviArrowSingle: 0,
    gviArrowDual: 1
};

/*!
 * 对该枚举的说明
 */
gviCollisionDetectionMode = {
    gvEnableKeyboardCollision: 1,
    gvEnableMouseCollision: 2,
    gvEnableAllCollision: 3
};

/*!
 * 对该枚举的说明
 */
gviAttributeMask = {
    gviAttributeHighlight: 1,
    gviAttributeCollision: 2
};


/***********************************************/
/*GviResource
/***********************************************/


/*!
 * 对该枚举的说明
 */
gviImageType = {
    gviImageStatic: 0,
    gviImageDynamic: 1,
    gviImageCube: 2
};

/*!
 * 对该枚举的说明
 */
gviImageFormat = {
    gviImageUnknown: 0,
    gviImageDDS: 1,
    gviImagePNG: 2,
    gviImageJPG: 3,
    gviImagePVR: 4
};

/*!
 * 对该枚举的说明
 */
gviTextureWrapMode = {
    gviTextureWrapRepeat: 0,
    gviTextureWrapClampToEdge: 1
};

/*!
 * 对该枚举的说明
 */
gviCullFaceMode = {
    gviCullNone: 0,
    gviCullBack: 1,
    gviCullFront: 2
};

/*!
 * 对该枚举的说明
 */
gviPrimitiveType = {
    gviPrimitiveNormal: 0,
    gviPrimitiveBillboardZ: 1,
    gviPrimitiveWater: 2,
    gviPrimitiveGlass: 3,
    gviPrimitive3DTree: 4,
    gviPrimitiveNone: 5
};

/*!
 * 对该枚举的说明
 */
gviPrimitiveMode = {
    gviPrimitiveModeTriangleList: 0,
    gviPrimitiveModeLineList: 1,
    gviPrimitiveModePointList: 2,
    gviPrimitiveModeNone: 3
};
